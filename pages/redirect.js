import { Box } from '@mui/material'
import * as React from 'react'
import { useAuthStore } from '@/store/auth'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import { useRouter } from 'next/router'
import useAuthReadyEffect from '@/hooks/useAuthReadyEffect'

const Loading = () => {
	const { push, query } = useRouter()
	const {
		login,
		isLoggedIn,
		justLoggedIn,
		finishLogin,
		getProfile,
		hasUpdatedToken,
		updateTokenError,
		updateToken,
		resetUpdateToken,
		previousRoute,
	} = useAuthStore()
	const { toast } = useUiStore()

	useAuthReadyEffect(() => {
		const code = query?.code

		if (!code) return
		updateToken(code)
	}, [query, updateToken, toast, resetUpdateToken, push])

	useAuthReadyEffect(() => {
		const error = query?.error

		if (!error) return
		toast('Permission not granted', TOAST.ERROR)
		resetUpdateToken()
		push(previousRoute)
	}, [query, updateToken, toast, resetUpdateToken, push])

	useAuthReadyEffect(() => {
		if (isLoggedIn) return

		const params = window.location.hash.substring(1)
		const token = new URLSearchParams(params).get('access_token')

		if (!token) return

		login(token)
		push(previousRoute)
	}, [isLoggedIn, query, push, login, previousRoute])

	useAuthReadyEffect(() => {
		if (justLoggedIn) {
			toast('Success Login', TOAST.SUCCESS)
			finishLogin()
			getProfile()
		}
	}, [justLoggedIn, finishLogin, toast, getProfile])

	useAuthReadyEffect(() => {
		if (!isLoggedIn) push(previousRoute)
	}, [])

	React.useEffect(() => {
		if (hasUpdatedToken) {
			toast('Permission granted', TOAST.SUCCESS)
			push(previousRoute)
		}
	}, [hasUpdatedToken, toast, push, previousRoute])

	React.useEffect(() => {
		if (updateTokenError) {
			toast('Error granting permission', TOAST.ERROR)
			resetUpdateToken()
			push(previousRoute)
		}
	}, [updateTokenError, toast, resetUpdateToken, push, previousRoute])

	return <Box>Loading...</Box>
}

export default Loading
