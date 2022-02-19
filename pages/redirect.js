import { Box, Typography } from '@mui/material'
import * as React from 'react'
import { useAuthStore } from '@/store/auth'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import { useRouter } from 'next/router'
import useAuthReadyEffect from '@/hooks/useAuthReadyEffect'
import Image from 'next/image'

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

	const [loadingDotCount, setLoadingDotCount] = React.useState(0)

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
	}, [isLoggedIn, push, previousRoute])

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

	React.useEffect(() => {
		const animationInterval = setInterval(
			() =>
				setLoadingDotCount(prevState => {
					if (prevState === 3) return 0

					return prevState + 1
				}),
			500
		)

		return () => clearInterval(animationInterval)
	}, [])

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image src="/images/loading.svg" width={500} height={500} alt="loading" />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Typography variant="h5" color="primary.light">
					Hold on a tight
				</Typography>
				<Typography
					variant="h5"
					color="primary.light"
					sx={{ width: 50, ml: 1 }}
				>
					{[...new Array(loadingDotCount)].map(() => '.')}
				</Typography>
			</Box>
		</Box>
	)
}

export default Loading
