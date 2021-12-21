import * as React from 'react'
import {
	Avatar,
	Box,
	IconButton,
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
	const { profile, logout, isGettingProfile, hasGotProfile } = useAuthStore()
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
		const {
			data: { url },
		} = await AuthSrv.logout()

		logout()
		push(url)
	}, [push, logout])

	return (
		<>
			{!isProfileReady && (
				<Skeleton variant="circular" width={32} height={32} />
			)}
			{isProfileReady && (
				<>
					<Tooltip title="Profile">
						<IconButton onClick={onProfileOpen} size="small">
							<Avatar sx={{ width: 32, height: 32 }} src={profile.picture} />
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
							<Avatar sx={{ width: 100, height: 100 }} src={profile?.picture} />
							<Typography
								variant="h6"
								component="h2"
								sx={{ fontWeight: 'medium' }}
							>
								{profile?.name}
							</Typography>
							<Typography variant="caption">{profile?.email}</Typography>
							<LoadingButton
								sx={{ mt: 2 }}
								variant="contained"
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
