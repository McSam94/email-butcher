import * as React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
// import PriceIcon from '@mui/icons-material/PriceChange'
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
import Image from 'next/image'

const Header = () => {
	const { push } = useRouter()
	const { isLoggedIn, rememberRoute } = useAuthStore()

	const [isLoggingIn, setIsLoggingIn] = React.useState(false)

	const onLogin = React.useCallback(async () => {
		setIsLoggingIn(true)
		rememberRoute(window.location.pathname)

		const {
			data: { url },
		} = await AuthSrv.login()

		push(url)
	}, [rememberRoute, push])

	return (
		<Box
			component="nav"
			sx={{
				px: 4,
				display: 'flex',
				width: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
				bgcolor: 'grey.200',
				height: Config.HEADER_HEIGHT,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Logo size="s" />
				<List sx={{ display: 'inline-flex', py: 0, height: '100%', ml: 2 }}>
					{Object.values(MENU).map(({ label, link }) => (
						<Link href={link} passHref key={label}>
							<ListItem button>
								<ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>
									{getMenuIcon(label)}
								</ListItemIcon>
								<ListItemText sx={{ color: 'secondary.main' }}>
									{capitalize(label)}
								</ListItemText>
							</ListItem>
						</Link>
					))}
				</List>
			</Box>
			{!isLoggedIn && (
				<Box>
					<LoadingButton
						disableRipple
						loading={isLoggingIn}
						loadingPosition="start"
						startIcon={
							<Image
								src="/images/google_icon.svg"
								width={40}
								height={40}
								alt="google"
							/>
						}
						variant="outlined"
						onClick={onLogin}
						sx={{
							textTransform: 'none',
							padding: 0,
							paddingRight: '8px',
							backgroundColor: '#4285F4',
							color: 'white',
							height: '40px',
							borderRadius: 0,
							'& .MuiButton-startIcon': {
								marginLeft: 0,
								marginRight: '12px',
							},
							'&:hover, &.Mui-disabled': {
								backgroundColor: '#4285F4',
								color: 'white',
								boxShadow: 2,
							},
						}}
					>
						Sign in with Google
					</LoadingButton>
				</Box>
			)}
			{isLoggedIn && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						height: '100%',
					}}
				>
					{/* <ListItem button sx={{ height: '100%', mr: 2 }}>
						<ListItemIcon>
							<PriceIcon />
						</ListItemIcon>
						<ListItemText>Pricing</ListItemText>
					</ListItem> */}
					<Profile />
				</Box>
			)}
		</Box>
	)
}

export default Header
