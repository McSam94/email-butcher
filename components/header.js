import * as React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import Link from 'next/link'
import { useRouter } from 'next/router'
import capitalize from 'lodash/capitalize'
import { getMenuIcon } from '@/utilities/menu'
import AuthSrv from '@/services/auth'
import MENU from '@/constants/menu'
import { useAuthStore } from '@/store/auth'
import Config from '@/constants/config'
import Logo from '@/components/logo'
import Profile from '@/components/profile'

const Header = () => {
	const { push } = useRouter()
	const { isLoggedIn } = useAuthStore()

	const [isLoggingIn, setIsLoggingIn] = React.useState(false)

	const onLogin = React.useCallback(async () => {
		setIsLoggingIn(true)
		const {
			data: { url },
		} = await AuthSrv.login()

		push(url)
	}, [push])

	return (
		<Box
			component="nav"
			sx={{
				px: 4,
				display: 'flex',
				width: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
				bgcolor: 'grey.100',
				height: Config.HEADER_HEIGHT,
			}}
		>
			<Logo size="s" />
			<List sx={{ display: 'inline-flex', py: 0, height: '100%' }}>
				{Object.values(MENU).map(({ label, link }) => (
					<Link href={link} passHref key={label}>
						<ListItem button>
							<ListItemIcon>{getMenuIcon(label)}</ListItemIcon>
							<ListItemText>{capitalize(label)}</ListItemText>
						</ListItem>
					</Link>
				))}
			</List>
			{!isLoggedIn && (
				<Box>
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
				</Box>
			)}
			{isLoggedIn && (
				<Box>
					<Profile />
				</Box>
			)}
		</Box>
	)
}

export default Header
