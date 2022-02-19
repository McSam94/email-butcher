import * as React from 'react'
import Toast from '@/components/toast'
import { initAuthState, useAuthStore } from '@/store/auth'
import { initUiState } from '@/store/ui'
import Header from '@/components/header'
import Config from '@/constants/config'
import { Box } from '@mui/material'
import ApiUtils from '@/services/index'
import Footer from './footer'
import { useRouter } from 'next/router'

const LAYOUT_BLACKLIST = ['/redirect']

const Layout = ({ children }) => {
	const { route } = useRouter()
	const { isReady, logout } = useAuthStore()

	if (!isReady) {
		initAuthState()
		initUiState()
		ApiUtils.injectLogout(logout)
	}

	if (LAYOUT_BLACKLIST.includes(route)) return <>{children}</>

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
				<Box
					sx={{
						p: 2,
						flex: 1,
						display: 'flex',
					}}
				>
					{children}
				</Box>
				<Footer />
			</Box>
			<Toast />
		</>
	)
}

export default Layout
