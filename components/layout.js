import * as React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import capitalize from 'lodash/capitalize'
import { getMenuIcon } from '@/utilities/menu'
import Toast from '@/components/toast'
import MENU from '@/constants/menu'
import TOAST from '@/constants/toast'
import Config from '@/constants/config'
import AuthSrv from '@/services/auth'
import { useAuthStore, initAuthState } from '@/store/auth'
import { useUiStore, initUiState } from '@/store/ui'

const Layout = ({ children }) => {
	const { push } = useRouter()
	const { login, logout, isLoggedIn, justLoggedIn, finishLogin } =
		useAuthStore()
	const { toast } = useUiStore()

	const [isLoggingIn, setIsLoggingIn] = React.useState(false)

	initAuthState()
	initUiState()

	const onLogin = React.useCallback(async () => {
		setIsLoggingIn(true)
		const {
			data: { url },
		} = await AuthSrv.login()

		push(url)
	}, [push])

	const onLogout = React.useCallback(() => {
		logout()
	}, [logout])

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
		}
	}, [justLoggedIn, finishLogin, push, toast])

	return (
		<>
			<Box
				component="nav"
				sx={{
					display: 'flex',
					width: '100%',
					justifyContent: 'center',
					bgcolor: 'grey.100',
					height: Config.HEADER_HEIGHT,
				}}
			>
				<List sx={{ display: 'inline-flex', py: 0, height: '100%' }}>
					{Object.values(MENU).map(({ label, link }) => (
						<Link href={link} passHref key={label}>
							<ListItem button>
								<ListItemIcon>{getMenuIcon(label)}</ListItemIcon>
								<ListItemText>{capitalize(label)}</ListItemText>
							</ListItem>
						</Link>
					))}
					{!isLoggedIn && (
						<ListItem>
							<LoadingButton
								disableRipple
								loading={isLoggingIn}
								loadingPosition="start"
								startIcon={<LoginIcon />}
								variant="outlined"
								onClick={onLogin}
							>
								Login
							</LoadingButton>
						</ListItem>
					)}
					{isLoggedIn && (
						<ListItem button onClick={onLogout}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</ListItem>
					)}
				</List>
			</Box>
			<main>{children}</main>
			<Toast />
		</>
	)
}

export default Layout
