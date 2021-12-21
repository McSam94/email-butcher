import * as React from 'react'
import { Box, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Head from 'next/head'
import Logo from '@/components/logo'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useJobStore } from '@/store/job'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import RunIcon from '@mui/icons-material/DirectionsRun'

const Main = () => {
	const {
		createJob,
		hasCreatedJob,
		isCreatingJob,
		hasRanJob,
		createJobError,
		resetCreateJob,
	} = useJobStore()
	const { toast } = useUiStore()

	const jobSchema = React.useMemo(
		() =>
			yup.object().shape({
				name: yup.string().required('Name is required'),
				folderName: yup.string().required('Folder name is required'),
				email: yup.string().required('Email is required'),
			}),
		[]
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(jobSchema),
	})

	const onSubmit = React.useCallback(
		({ name, folderName, email }) => {
			createJob({
				name,
				folderName,
				mailQuery: `from:${email},has:attachment`,
				recurring: false,
			})
		},
		[createJob]
	)

	React.useEffect(() => {
		if (hasCreatedJob) {
			reset()
			toast(
				'Job successfully created and running in background!',
				TOAST.SUCCESS
			)
		}
	}, [hasCreatedJob, toast, reset])

	React.useEffect(() => {
		if (hasRanJob) toast('Job has completed!', TOAST.SUCCESS)
	}, [hasRanJob, toast])

	React.useEffect(() => {
		if (createJobError) {
			toast(
				"Ops! Looks like we're having trouble running the job.",
				TOAST.ERROR
			)
			resetCreateJob()
		}
	}, [createJobError, toast, resetCreateJob])

	return (
		<>
			<Head>
				<title>Email Butler</title>
				<meta name="description" content="Email extraction automation" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				sx={{
					flexGrow: 1,
					width: '420px',
					display: 'flex',
					flexDirection: 'column',
					alignSelf: 'center',
					textAlign: 'center',
					mt: 12,
					'& form': {
						display: 'flex',
						flexDirection: 'column',
					},
					'& form .MuiTextField-root': {
						marginTop: 4,
					},
				}}
			>
				<Logo size="l" />
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register('name')}
						error={!!errors?.name}
						label="Name"
						variant="outlined"
						size="small"
						helperText={errors?.name?.message ?? ''}
					/>
					<TextField
						{...register('folderName')}
						error={!!errors?.folderName}
						label="Folder Name"
						variant="outlined"
						size="small"
						helperText={
							errors?.folderName?.message ??
							"Folder will be created at your Google Drive's root path"
						}
					/>
					<TextField
						{...register('email')}
						error={!!errors?.email}
						label="Sender Email"
						variant="outlined"
						size="small"
						helperText={errors?.email?.message ?? 'Sender email'}
					/>
					<LoadingButton
						disableRipple
						disableElevation
						sx={{ mt: 4 }}
						variant="contained"
						loading={isCreatingJob}
						loadingPosition="start"
						startIcon={<RunIcon />}
						type="submit"
					>
						Run instantly
					</LoadingButton>
				</form>
			</Box>
		</>
	)
}

// export async function getStaticProps() {
// 	return await preFetchData('https://jsonplaceholder.typicode.com/posts')
// }

export default Main
