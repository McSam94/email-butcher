import * as React from 'react'
import Head from 'next/head'
import { DataGrid } from '@mui/x-data-grid'
import { COLUMNS } from '@/constants/schedule'
import ContentHeader from '@/components/content-header'
import Results from '@/components/schdule/results'
import CloseIcon from '@mui/icons-material/Close'
import { useJobStore } from '@/store/job'
import { Box, Divider, IconButton, Modal } from '@mui/material'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/router'

const Schedule = () => {
	const { push } = useRouter()
	const {
		jobs,
		getInitialJobs,
		getPageJobs,
		updatePageSize,
		isGettingJobs,
		pagination: { limit, totalItems },
	} = useJobStore()
	const { isLoggedIn } = useAuthStore()

	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const [name, setName] = React.useState(null)
	const [results, setResults] = React.useState([])

	const onRowClick = React.useCallback(({ id, getValue }) => {
		setResults(getValue(id, 'jobResults'))
		setName(getValue(id, 'name'))
		setIsModalOpen(true)
	}, [])

	const onModalClose = React.useCallback(() => {
		setIsModalOpen(false)
		setResults([])
		setName(null)
	}, [])

	const onPageChange = React.useCallback(
		page => {
			getPageJobs(page + 1)
		},
		[getPageJobs]
	)

	const onPageSizeChange = React.useCallback(
		limit => {
			updatePageSize(limit)
		},
		[updatePageSize]
	)

	React.useEffect(() => {
		if (!isLoggedIn) push('/')
	}, [isLoggedIn, push])

	React.useEffect(() => {
		getInitialJobs()
	}, [getInitialJobs])

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
				<ContentHeader
					title="Schedule"
					description="Schedule periodically to exact attachment from predefined setting"
				/>
				<Divider sx={{ my: 2 }} />
				<Box sx={{ height: '100%' }}>
					<DataGrid
						paginationMode="server"
						rows={jobs ?? []}
						columns={COLUMNS}
						disableSelectionOnClick
						disableExtendRowFullWidth={false}
						onRowClick={onRowClick}
						loading={isGettingJobs}
						pageSize={limit}
						rowCount={totalItems}
						onPageChange={onPageChange}
						onPageSizeChange={onPageSizeChange}
					/>
				</Box>
			</Box>
			<Modal open={isModalOpen} onClose={onModalClose}>
				<Box
					sx={{
						bgcolor: 'background.paper',
						width: '90%',
						height: '90%',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						position: 'absolute',
						p: 4,
					}}
				>
					<IconButton
						sx={{ position: 'absolute', right: 10, top: 10 }}
						onClick={onModalClose}
					>
						<CloseIcon />
					</IconButton>
					<Results name={name} results={results} />
				</Box>
			</Modal>
		</>
	)
}

export default Schedule
