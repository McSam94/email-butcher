import * as React from 'react'
import { useRouter } from 'next/router'
import Toast from '@/components/toast'
import TOAST from '@/constants/toast'
import { useAuthStore, initAuthState } from '@/store/auth'
import { useUiStore, initUiState } from '@/store/ui'
import Header from '@/components/header'
import Config from '@/constants/config'
import { Box } from '@mui/material'
import ApiUtil from '@/services/index'

const Layout = ({ children }) => {
	const { push } = useRouter()
	const { token, login, isLoggedIn, justLoggedIn, finishLogin, getProfile } =
		useAuthStore()
	const { toast } = useUiStore()

	const [isReady, setIsReady] = React.useState(false)

	initAuthState()
	initUiState()

	React.useEffect(() => {
		ApiUtil.injectToken(token, () => {
			setIsReady(true)
		})
	}, [token])

	React.useEffect(() => {
		if (isLoggedIn) return

		const params = window.location.hash.substring(1)
		const token = new URLSearchParams(params).get('access_token')

		if (!token) return

		login(token)
		push('/')
	}, [push, login, isLoggedIn])

	React.useEffect(() => {
		if (justLoggedIn) {
			toast('Success Login', TOAST.SUCCESS)
			finishLogin()
			getProfile()
		}
	}, [justLoggedIn, finishLogin, push, toast, getProfile])

	if (!isReady) {
		return null
	}

	return (
		<>
			<Header />
			<Box
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: `calc(100vh - ${Config.HEADER_HEIGHT}px)`,
					width: '100vw',
					bgcolor: 'grey.100',
					overflowY: 'scroll',
					p: 2,
				}}
			>
				{children}
			</Box>
			<Toast />
		</>
	)
}

export default Layout
