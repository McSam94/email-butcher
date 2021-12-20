import * as React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import capitalize from 'lodash/capitalize'
import { getMenuIcon } from '@/utilities/menu'
import MENU from '@/constants/menu'
import Config from '@/constants/config'
import Link from 'next/link'
import { login } from '@/services/auth'
import { AuthContext, initAuthState } from '@/store/auth'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
	const { push } = useRouter()
	const { setAccessToken, token } = React.useContext(AuthContext)

	initAuthState()

	const onLogin = React.useCallback(async () => {
		const {
			data: { url },
		} = await login()

		push(url)
	}, [push])

	React.useEffect(() => {
		const accessToken = window.location.hash.substring(14)

		if (!accessToken) {
			return
		}

		setAccessToken(accessToken)
		push('/')
	}, [push, setAccessToken])

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
					{!token && (
						<ListItem button onClick={onLogin}>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText>Login</ListItemText>
						</ListItem>
					)}
				</List>
			</Box>
			<main>{children}</main>
		</>
	)
}

export default Layout
