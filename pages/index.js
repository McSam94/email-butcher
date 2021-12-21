import * as React from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import { useAuthStore } from '@/store/auth'
import CONFIG from '@/constants/config'

const Main = () => {
	const { token } = useAuthStore()

	return (
		<>
			<Head>
				<title>Email Butler</title>
				<meta name="description" content="Email extraction automation" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box sx={{ flexGrow: 1, width: `calc(100% - ${CONFIG.DRAWER_WIDTH}px)` }}>
				<p style={{ overflowWrap: 'break-word' }}>LoggedIn as: {token}</p>
			</Box>
		</>
	)
}

// export async function getStaticProps() {
// 	return await preFetchData('https://jsonplaceholder.typicode.com/posts')
// }

export default Main
