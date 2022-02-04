import * as React from 'react'
import { Box, Divider } from '@mui/material'
import Head from 'next/head'
import Landing from '@/components/home/landing'
import Instant from '@/components/home/instant'
import About from '@/components/home/about'
import Coffee from '@/components/home/coffee'

const Main = () => {
	return (
		<>
			<Head>
				<title>Email Butcher</title>
				<meta name="description" content="Email extraction automation" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				sx={{
					flexGrow: 1,
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignSelf: 'center',
					textAlign: 'center',
					my: 12,
					'& form': {
						display: 'flex',
						flexDirection: 'column',
					},
				}}
			>
				<Landing />
				<Divider sx={{ mt: 12, mb: 10, width: '80%', alignSelf: 'center' }} />
				<About />
				<Divider sx={{ mt: 12, mb: 10, width: '80%', alignSelf: 'center' }} />
				<Instant />
				<Divider sx={{ mt: 12, mb: 10, width: '80%', alignSelf: 'center' }} />
				<Coffee />
			</Box>
		</>
	)
}

// export async function getStaticProps() {
// 	return await preFetchData('https://jsonplaceholder.typicode.com/posts')
// }

export default Main
