import * as React from 'react'
import Head from 'next/head'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import ContentHeader from '@/components/content-header'
import RunIcon from '@mui/icons-material/PlayArrow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Close'
import { useJobStore } from '@/store/job'
import { Box, Divider, Button, Input, Switch } from '@mui/material'
import dayjs from 'dayjs'
import Details from '@/components/schedule/details'
import AddEdit from '@/components/schedule/add-edit'
import { getMailFromQuery } from '@/utilities/schedule'
import DeleteDialog from '@/components/delete-dialog'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import debounce from 'lodash/debounce'
import useAuthReadyEffect from '@/hooks/useAuthReadyEffect'
import { checkPermission } from '@/utilities/permission'
import { useRouter } from 'next/router'
import useDynamicRefs from 'use-dynamic-refs'
import { useAuthStore } from '@/store/auth'

const LEAVE_MESSAGE =
	'Are you sure you want to leave? You are in the middle of running a job. Leaving could result in abandoning your current running job'

const Schedule = () => {
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
		runJob,
		resetRunJob,
		hasJobRan,
		runJobError,
		editJob,
		isRunningJob,
		runningJobId,
		getJobError,
		resetGetJobs,
		editJobError,
		resetEditJob,
	} = useJobStore()
	const { toast } = useUiStore()
	const { isLoggedIn, rememberRoute } = useAuthStore()
	const { push, events } = useRouter()
	const [getRef, setRef] = useDynamicRefs()

	const inputRef = React.useRef()

	const [isAdd, setIsAdd] = React.useState(true)
	const [updatingJobId, setUpdatingJobId] = React.useState(null)
	const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false)
	const [isAddEditModalOpen, setIsAddEditModalOpen] = React.useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

	/**Table Actions */
	const onDelete = React.useCallback(
		({ row }) => {
			selectJob(row)
			setIsDeleteModalOpen(true)
		},
		[selectJob]
	)

	const onEdit = React.useCallback(
		({ row }) => {
			selectJob(row)
			setIsAdd(false)
			setIsAddEditModalOpen(true)
		},
		[selectJob]
	)

	const onRun = React.useCallback(
		async ({ row }) => {
			const data = await checkPermission()
			if (data.isAuthenticated) runJob(row.id)
			else {
				rememberRoute(window.location.pathname)
				push(data.url)
			}
		},
		[runJob, push, rememberRoute]
	)

	const onRecurringUpdate = React.useCallback(
		(event, { row }) => {
			const shouldRecurring = event.target.checked

			editJob(row.id, { recurring: shouldRecurring })
			setUpdatingJobId(row.id)
		},
		[editJob]
	)
	/**Table Actions */

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
				field: 'recurring',
				headerName: 'Repeat',
				type: 'boolean',
				renderCell: param => (
					<Switch
						ref={setRef(param.row.id)}
						key={param.row.id}
						inputProps={{ 'aria-label': 'recurring-field' }}
						defaultChecked={!!param.value}
						disabled={runningJobId === param.row.id && isRunningJob}
						onChange={event => onRecurringUpdate(event, param)}
					/>
				),
			},
			{
				field: 'actions',
				type: 'actions',
				flex: 3,
				getActions: param => [
					<GridActionsCellItem
						key="run"
						icon={<RunIcon />}
						disabled={runningJobId === param.row.id && isRunningJob}
						onClick={() => onRun(param)}
						label="Run"
					/>,
					<GridActionsCellItem
						key="edit"
						icon={<EditIcon />}
						disabled={runningJobId === param.row.id && isRunningJob}
						onClick={() => onEdit(param)}
						label="Edit"
					/>,
					<GridActionsCellItem
						key="delete"
						disabled={runningJobId === param.row.id && isRunningJob}
						onClick={() => onDelete(param)}
						icon={<DeleteIcon />}
						label="Delete"
					/>,
				],
			},
		],
		[
			onEdit,
			onDelete,
			onRun,
			onRecurringUpdate,
			isRunningJob,
			runningJobId,
			setRef,
		]
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

	const confirmDelete = React.useCallback(() => {
		deleteJob(selectedJob.id)
	}, [deleteJob, selectedJob])

	const onAdd = React.useCallback(() => {
		setIsAdd(true)
		setIsAddEditModalOpen(true)
	}, [])

	const onRowClick = React.useCallback(
		({ row }, event) => {
			if (event.target.ariaLabel === 'recurring-field') return

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
			if (!search) return

			getJobs(search)
		}, 500),
		[getJobs]
	)

	const clearSearch = React.useCallback(
		debounce(() => {
			if (!inputRef.current.value) return

			getJobs()
			inputRef.current.value = ''
		}),
		[getJobs]
	)

	const routeChangeHandler = React.useCallback(
		url => {
			const shouldContinue = window.confirm(LEAVE_MESSAGE)

			if (!shouldContinue) {
				events.emit('routeChangeError')
				throw `Route change to ${url} aborted`
			}
		},
		[events]
	)

	useAuthReadyEffect(() => {
		if (isLoggedIn) getJobs()
	}, [isLoggedIn, getJobs])

	React.useEffect(() => {
		if (runJobError) toast('Something wrong running the job', TOAST.ERROR)

		resetRunJob()
	}, [runJobError, toast, resetRunJob])

	React.useEffect(() => {
		if (isRunningJob)
			toast(
				'Job running in progress. It could takes up a few minutes.',
				TOAST.INFO
			)
	}, [isRunningJob, toast])

	React.useEffect(() => {
		if (hasJobRan) {
			toast('Successfully ran job. Please check your drive', TOAST.SUCCESS)

			getJobs()
			resetRunJob()
		}
	}, [hasJobRan, toast, getJobs, resetRunJob])

	React.useEffect(() => {
		if (getJobError) {
			resetGetJobs()
		}
	}, [getJobError, toast, resetGetJobs])

	React.useEffect(() => {
		if (hasEditedJob) {
			toast('Successfully updated field', TOAST.SUCCESS)
			resetEditJob()
		}
	}, [hasEditedJob, toast, resetEditJob])

	React.useEffect(() => {
		if (editJobError) {
			toast('Something went wrong when updating your request', TOAST.ERROR)
			resetEditJob()

			if (!updatingJobId) return
			getRef(updatingJobId).current.classList.remove('Mui-checked')
			setUpdatingJobId(null)
		}
	}, [editJobError, toast, resetEditJob, getJobs, getRef, updatingJobId])

	React.useEffect(() => {
		if (hasDeletedJob) {
			toast('Successfully deleted job', TOAST.SUCCESS)
			setIsDeleteModalOpen(false)
			removeSelectedJob()
			resetDeleteJob()
		}
	}, [toast, hasDeletedJob, removeSelectedJob, resetDeleteJob])

	React.useEffect(() => {
		if (isRunningJob) {
			events.on('routeChangeStart', routeChangeHandler)
			window.onbeforeunload = function () {
				return LEAVE_MESSAGE
			}
		} else {
			events.off('routeChangeStart', routeChangeHandler)
			window.onbeforeunload = null
		}
	}, [events, isRunningJob, routeChangeHandler])

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
				{isLoggedIn && (
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
				)}
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
