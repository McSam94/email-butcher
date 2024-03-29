import * as React from 'react'
import {
	Avatar,
	Box,
	IconButton,
	ListItem,
	Menu,
	Skeleton,
	Tooltip,
	Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthStore } from '@/store/auth'
import AuthSrv from '@/services/auth'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'

const Profile = () => {
	const { push } = useRouter()
	const { profile, logout, isGettingProfile, hasGotProfile, rememberRoute } =
		useAuthStore()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [isLoggingOut, setIsLoggingOut] = React.useState(false)

	const open = React.useMemo(() => Boolean(anchorEl), [anchorEl])

	const isProfileReady = React.useMemo(
		() => !isGettingProfile && hasGotProfile,
		[isGettingProfile, hasGotProfile]
	)

	const onProfileOpen = React.useCallback(({ currentTarget }) => {
		setAnchorEl(currentTarget)
	}, [])

	const onProfileClose = React.useCallback(() => {
		setAnchorEl(null)
	}, [])

	const onLogout = React.useCallback(async () => {
		setIsLoggingOut(true)
		rememberRoute(window.location.pathname)

		const {
			data: { url },
		} = await AuthSrv.logout()

		logout()
		push(url)
	}, [push, logout, rememberRoute])

	return (
		<>
			{!isProfileReady && (
				<ListItem>
					<Skeleton variant="circular" width={40} height={40} />
				</ListItem>
			)}
			{isProfileReady && (
				<>
					<Tooltip title="Profile">
						<IconButton onClick={onProfileOpen} size="small">
							<Avatar sx={{ width: 40, height: 40 }} src={profile.picture} />
						</IconButton>
					</Tooltip>
					<Menu anchorEl={anchorEl} open={open} onClose={onProfileClose}>
						<Box
							sx={{
								px: 4,
								py: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ width: 70, height: 70 }} src={profile?.picture} />
							<Typography
								variant="subtitle1"
								sx={{ fontWeight: 'medium', fontFamily: 'sans-serif', mt: 2 }}
							>
								{profile?.name}
							</Typography>
							<Typography variant="caption" sx={{ color: 'grey.600' }}>
								{profile?.email}
							</Typography>
							<LoadingButton
								size="small"
								sx={{ mt: 2 }}
								variant="outlined"
								startIcon={<LogoutIcon />}
								onClick={onLogout}
								loadingPosition="start"
								loading={isLoggingOut}
								disableElevation
							>
								Logout
							</LoadingButton>
						</Box>
					</Menu>
				</>
			)}
		</>
	)
}

export default Profile
