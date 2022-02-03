import * as React from 'react'
import Toast from '@/components/toast'
import { initAuthState, useAuthStore } from '@/store/auth'
import { initUiState } from '@/store/ui'
import Header from '@/components/header'
import Config from '@/constants/config'
import { Box } from '@mui/material'
import ApiUtils from '@/services/index'
import Footer from './footer'

const Layout = ({ children }) => {
	const { isReady, logout } = useAuthStore()

	if (!isReady) {
		initAuthState()
		initUiState()
		ApiUtils.injectLogout(logout)
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
				}}
			>
				<Box sx={{ p: 2, height: `100%` }}>{children}</Box>
				<Footer />
			</Box>
			<Toast />
		</>
	)
}

export default Layout
