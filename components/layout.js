import * as React from 'react'
import Toast from '@/components/toast'
import { initAuthState, useAuthStore } from '@/store/auth'
import { initUiState } from '@/store/ui'
import Header from '@/components/header'
import Config from '@/constants/config'
import { Box } from '@mui/material'

const Layout = ({ children }) => {
	const { isReady } = useAuthStore()

	if (!isReady) {
		initAuthState()
		initUiState()
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
