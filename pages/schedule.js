import * as React from 'react'
import Head from 'next/head'
import { DataGrid } from '@mui/x-data-grid'
import { COLUMNS } from '@/constants/schedule'
import { useJobStore } from '@/store/job'
import { Box, Divider, Typography } from '@mui/material'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/router'

const Schedule = () => {
	const { push } = useRouter()
	const { jobs, getJobs } = useJobStore()
	const { isLoggedIn } = useAuthStore()

	React.useEffect(() => {
		if (!isLoggedIn) push('/')
	}, [isLoggedIn, push])

	React.useEffect(() => {
		getJobs({
			limit: 30,
		})
	}, [getJobs])

	return (
		<>
			<Head>
				<title>Email Butler | Schedule</title>
				<meta name="description" content="Schedule Email Extraction" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100px',
						py: 4,
					}}
				>
					<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
						Schedule
					</Typography>
					<Typography variant="subtitle1">
						Schedule periodically to exact attachment from predefined setting
					</Typography>
				</Box>
				<Divider sx={{ my: 2 }} />
				<Box sx={{ height: '100%' }}>
					<DataGrid
						rows={jobs ?? []}
						columns={COLUMNS}
						disableSelectionOnClick
						disableExtendRowFullWidth={false}
					/>
				</Box>
			</Box>
		</>
	)
}

export default Schedule
