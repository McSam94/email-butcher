import * as React from 'react'
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	Skeleton,
	Tooltip,
	Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthStore } from '@/store/auth'

const Profile = () => {
	const { profile, logout, isGettingProfile, hasGotProfile } = useAuthStore()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const onProfileOpen = React.useCallback(({ currentTarget }) => {
		setAnchorEl(currentTarget)
	}, [])

	const onProfileClose = React.useCallback(() => {
		setAnchorEl(null)
	}, [])

	const onLogout = React.useCallback(() => {
		logout()
	}, [logout])

	return (
		<>
			{isGettingProfile && (
				<Skeleton variant="circular" width={32} height={32} />
			)}
			{hasGotProfile && (
				<>
					<Tooltip title="Profile">
						<IconButton onClick={onProfileOpen} size="small">
							<Avatar sx={{ width: 32, height: 32 }} src={profile.picture} />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={onProfileClose}
						onClick={onProfileClose}
					>
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
							<Button
								sx={{ mt: 2 }}
								variant="contained"
								startIcon={<LogoutIcon />}
								onClick={onLogout}
								disableElevation
							>
								Logout
							</Button>
						</Box>
					</Menu>
				</>
			)}
		</>
	)
}

export default Profile
