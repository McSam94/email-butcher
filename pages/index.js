import * as React from 'react'
import {
	Box,
	Divider,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useAuthStore } from '@/store/auth'
import AuthSrv from '@/services/auth'
import { useRouter } from 'next/router'
import { generateMailQuery } from '@/utilities/mail-query'
import { checkPermission } from '@/utilities/permission'

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
	const { isLoggedIn, rememberRoute } = useAuthStore()

	const [isExpanded, setIsExpand] = React.useState(false)
	const [isLoggingIn, setIsLoggingIn] = React.useState(false)

	const jobSchema = React.useMemo(
		() =>
			yup.object().shape({
				folderName: yup.string().required('Folder name is required'),
				fromEmail: yup.string().required('Email is required'),
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

	const onStepOneExpand = React.useCallback(() => {
		setIsExpand(prevState => !prevState)
	}, [])

	const onSubmit = React.useCallback(
		async ({ folderName, fromEmail, toEmail, cc, bcc, subject, label }) => {
			const data = await checkPermission()
			if (data.isAuthenticated)
				instantJob({
					folderName,
					mailQuery: generateMailQuery({
						from: fromEmail,
						...(isExpanded ? { to: toEmail, cc, bcc, subject, label } : {}),
					}),
				})
			else {
				rememberRoute(window.location.pathname)
				push(data.url)
			}
		},
		[instantJob, isExpanded, rememberRoute, push]
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
				<Box sx={{ maxWidth: '480px', alignSelf: 'center' }}>
					<Logo size="l" />
					<Typography
						variant="h6"
						sx={{ color: 'secondary.main', fontWeight: 'bold' }}
					>
						Finding that piece of meat ✉️ you want.
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
							color="secondary"
							sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
						>
							Step 1
						</Typography>
						<Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
							Put in the sender&apos;s email address you want to extract
							attachment
						</Typography>
						<TextField
							{...register('fromEmail')}
							error={!!errors?.fromEmail}
							label="Sender Email Address"
							size="small"
							helperText={errors?.fromEmail?.message ?? ''}
							inputProps={{
								endadornment: (
									<InputAdornment position="end">@gmail.com</InputAdornment>
								),
							}}
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Divider sx={{ width: 120, height: 2 }} />
								<IconButton onClick={onStepOneExpand}>
									{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</IconButton>
								<Divider sx={{ width: 120, height: 2 }} />
							</Box>
							{!isExpanded && (
								<Typography variant="caption" sx={{ color: 'text.secondary' }}>
									Advance Query
								</Typography>
							)}
						</Box>
						{isExpanded && (
							<>
								<TextField
									{...register('toEmail')}
									sx={{ margin: '12px 0' }}
									label="Recipient Email Address"
									size="small"
									inputProps={{
										endadornment: (
											<InputAdornment position="end">@gmail.com</InputAdornment>
										),
									}}
								/>
								<Box
									sx={{
										margin: '12px 0',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<TextField
										{...register('cc')}
										sx={{ width: '45%' }}
										label="Carbon Copy"
										size="small"
									/>
									<TextField
										{...register('bcc')}
										sx={{ width: '45%' }}
										label="Blind Carbon Copy"
										size="small"
									/>
								</Box>
								<TextField
									{...register('subject')}
									sx={{ margin: '12px 0' }}
									label="Words in Subject"
									size="small"
								/>
								<TextField
									{...register('label')}
									sx={{ margin: '12px 0' }}
									label="Email's Label"
									size="small"
								/>
							</>
						)}
						<Box sx={{ mt: 4 }}>
							<Typography
								variant="h4"
								color="secondary"
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
								sx={{ width: '100%' }}
								error={!!errors?.folderName}
								label="Folder Name"
								size="small"
								helperText={errors?.folderName?.message ?? ''}
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
