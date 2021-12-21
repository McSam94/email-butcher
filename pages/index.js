import * as React from 'react'
import { Box, Divider, TextField, Typography } from '@mui/material'
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
import GoogleIcon from '@mui/icons-material/Google'
import { useAuthStore } from '@/store/auth'
import AuthSrv from '@/services/auth'
import { useRouter } from 'next/router'

const Main = () => {
	const { push } = useRouter()
	const {
		instantJob,
		hasInstantJob,
		isInstantingJob,
		instantJobError,
		resetInstantJob,
	} = useJobStore()
	const { toast } = useUiStore()
	const { isLoggedIn } = useAuthStore()

	const [isLoggingIn, setIsLoggingIn] = React.useState(false)

	const jobSchema = React.useMemo(
		() =>
			yup.object().shape({
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
		({ folderName, email }) => {
			instantJob({
				folderName,
				mailQuery: `from:${email},has:attachment`,
			})
		},
		[instantJob]
	)

	const onSignUp = React.useCallback(async () => {
		setIsLoggingIn(true)
		const {
			data: { url },
		} = await AuthSrv.login()

		push(url)
	}, [push])

	React.useEffect(() => {
		if (hasInstantJob) {
			reset()
			toast('Job successfully ran', TOAST.SUCCESS)
		}
	}, [hasInstantJob, toast, reset])

	React.useEffect(() => {
		if (instantJobError) {
			toast(
				"Ops! Looks like we're having trouble running the job.",
				TOAST.ERROR
			)
			resetInstantJob()
		}
	}, [instantJobError, toast, resetInstantJob])

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
					'& form .MuiTextField-root': {
						marginTop: 2,
						width: '100%',
					},
				}}
			>
				<Box sx={{ maxWidth: '420px', alignSelf: 'center' }}>
					<Logo size="l" />
					<Typography variant="h6" sx={{ color: 'primary.light' }}>
						Sit veniam esse esse culpa qui cillum sunt dolore.
					</Typography>
				</Box>
				<Divider sx={{ mt: 12, mb: 10, width: '80%', alignSelf: 'center' }} />
				{/* <Typography
					variant="h4"
					sx={{ color: 'secondary.light', fontWeight: 'bold' }}
				>
					Try Now for Free
				</Typography> */}
				<Box sx={{ maxWidth: '420px', alignSelf: 'center' }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Typography
							variant="h4"
							sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
						>
							Step 1
						</Typography>
						<Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
							Put in the sender&apos;s email address you want to extract
							attachment
						</Typography>
						<TextField
							{...register('email')}
							error={!!errors?.email}
							label="Sender Email Address"
							variant="outlined"
							size="small"
							helperText={
								errors?.email?.message ??
								'Sender email address to filter email that you want to extract'
							}
						/>
						<Box sx={{ mt: 4 }}>
							<Typography
								variant="h4"
								sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
							>
								Step 2
							</Typography>
							<Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
								Folder name you want to create at your Google Drive&apos;s root
								path
							</Typography>
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
						</Box>
						{isLoggedIn ? (
							<LoadingButton
								disableRipple
								disableElevation
								sx={{ mt: 4 }}
								variant="contained"
								loading={isInstantingJob}
								loadingPosition="start"
								startIcon={<RunIcon />}
								type="submit"
							>
								Run
							</LoadingButton>
						) : (
							<LoadingButton
								disableRipple
								disableElevation
								sx={{ mt: 5 }}
								variant="contained"
								loading={isLoggingIn}
								loadingPosition="start"
								startIcon={<GoogleIcon />}
								onClick={onSignUp}
							>
								Sign up to try
							</LoadingButton>
						)}
					</form>
				</Box>
			</Box>
		</>
	)
}

// export async function getStaticProps() {
// 	return await preFetchData('https://jsonplaceholder.typicode.com/posts')
// }

export default Main
