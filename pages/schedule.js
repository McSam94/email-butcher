import * as React from 'react'
import Head from 'next/head'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import ContentHeader from '@/components/content-header'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useJobStore } from '@/store/job'
import { Box, Divider, Button, Input } from '@mui/material'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import Details from '@/components/schedule/details'
import AddEdit from '@/components/schedule/add-edit'
import { getMailFromQuery } from '@/utilities/schedule'
import DeleteDialog from '@/components/delete-dialog'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Close'
import debounce from 'lodash/debounce'

const Schedule = () => {
	const { push } = useRouter()
	const {
		jobs,
		getJobs,
		getPageJobs,
		updatePageSize,
		isGettingJobs,
		selectJob,
		pagination: { limit, totalItems },
		removeSelectedJob,
		deleteJob,
		selectedJob,
		resetDeleteJob,
		hasDeletedJob,
		hasCreatedJob,
		hasEditedJob,
	} = useJobStore()
	const { isLoggedIn } = useAuthStore()
	const { toast } = useUiStore()

	const inputRef = React.useRef()

	const [isAdd, setIsAdd] = React.useState(true)
	const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)
	const [isAddEditModalOpen, setIsAddEditModalOpen] = React.useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

	const tableColumns = React.useMemo(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				flex: 2,
			},
			{
				field: 'name',
				headerName: 'Name',
				flex: 4,
			},
			{
				field: 'storagePath',
				headerName: 'Drive',
				flex: 3,
			},
			{
				field: 'mailQuery',
				headerName: 'Sender Mail',
				flex: 4,
				valueGetter: param => getMailFromQuery(param.value),
			},
			{
				field: 'updatedAt',
				headerName: 'Last Run',
				flex: 3,
				valueGetter: param => dayjs(param.value).format('MMM, DD YYYY hh:mm A'),
			},
			{
				field: 'jobResults',
				headerName: 'Results',
				flex: 1,
				valueFormatter: param => param.value.length,
				valueParser: param => param.value,
			},
			{
				field: 'actions',
				type: 'actions',
				getActions: param => [
					<GridActionsCellItem
						key="edit"
						icon={<EditIcon />}
						onClick={() => onEdit(param)}
						label="Edit"
					/>,
					<GridActionsCellItem
						key="delete"
						onClick={() => onDelete(param)}
						icon={<DeleteIcon />}
						label="Delete"
					/>,
				],
			},
		],
		[onEdit, onDelete]
	)

	const onDetailModalClose = React.useCallback(() => {
		setIsDetailModalOpen(false)
		removeSelectedJob()
	}, [removeSelectedJob])

	const onAddEditModalClose = React.useCallback(() => {
		setIsAddEditModalOpen(false)
		removeSelectedJob()
	}, [removeSelectedJob])

	const onDeleteModalClose = React.useCallback(() => {
		setIsDeleteModalOpen(false)
		removeSelectedJob()
	}, [removeSelectedJob])

	const onDelete = React.useCallback(
		({ row }) => {
			selectJob(row)
			setIsDeleteModalOpen(true)
		},
		[selectJob]
	)

	const confirmDelete = React.useCallback(() => {
		deleteJob(selectedJob.id)
	}, [deleteJob, selectedJob])

	const onAdd = React.useCallback(() => {
		setIsAdd(true)
		setIsAddEditModalOpen(true)
	}, [])

	const onEdit = React.useCallback(
		({ row }) => {
			selectJob(row)
			setIsAdd(false)
			setIsAddEditModalOpen(true)
		},
		[selectJob]
	)

	const onRowClick = React.useCallback(
		({ row }) => {
			selectJob(row)
			setIsDetailModalOpen(true)
		},
		[selectJob]
	)

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

	const onSearch = React.useCallback(
		debounce(({ target: { value: search } }) => {
			getJobs(search)
		}, 500),
		[getJobs]
	)

	const clearSearch = React.useCallback(
		debounce(() => {
			getJobs()
			inputRef.current.value = ''
		}),
		[getJobs]
	)

	React.useEffect(() => {
		if (!isLoggedIn) push('/')
	}, [isLoggedIn, push])

	React.useEffect(() => {
		getJobs()
	}, [getJobs])

	React.useEffect(() => {
		if (hasDeletedJob) {
			toast('Successfully deleted job', TOAST.SUCCESS)
			setIsDeleteModalOpen(false)
			removeSelectedJob()
			resetDeleteJob()
		}
	}, [toast, hasDeletedJob, removeSelectedJob, resetDeleteJob])

	React.useEffect(() => {
		if (hasDeletedJob || hasCreatedJob || hasEditedJob) getJobs()
	}, [hasDeletedJob, hasCreatedJob, hasEditedJob, getJobs])

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
				<Box
					sx={{
						my: 1,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Button variant="contained" color="primary" onClick={onAdd}>
						Add Job
					</Button>
					<Input
						inputRef={inputRef}
						onChange={onSearch}
						placeholder="Search"
						startAdornment={<SearchIcon />}
						endAdornment={
							<ClearIcon
								color="action"
								sx={{ cursor: 'pointer' }}
								onClick={clearSearch}
							/>
						}
					/>
				</Box>
				<Box sx={{ height: '100%' }}>
					<DataGrid
						paginationMode="server"
						rows={jobs ?? []}
						columns={tableColumns}
						disableSelectionOnClick
						disableColumnSelector
						disableDensitySelector
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
			<Details isOpen={isDetailModalOpen} onClose={onDetailModalClose} />
			<AddEdit
				isAdd={isAdd}
				isOpen={isAddEditModalOpen}
				onClose={onAddEditModalClose}
			/>
			<DeleteDialog
				title="Are you sure to delete?"
				description="Deleting scheduled jobs can't be revert!"
				isOpen={isDeleteModalOpen}
				onClose={onDeleteModalClose}
				onDelete={confirmDelete}
			/>
		</>
	)
}

export default Schedule
