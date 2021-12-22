import * as React from 'react'
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import AddIcon from '@mui/icons-material/Add'
import { useJobStore } from '@/store/job'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useUiStore } from '@/store/ui'
import TOAST from '@/constants/toast'
import { getMailFromQuery } from '@/utilities/schedule'

const textFieldStyle = {
	mt: 4,
	width: '100%',
}

const Form = ({ isAdd, onClose }) => {
	const {
		createJob,
		isCreatingJob,
		hasCreatedJob,
		editJob,
		isEditingJob,
		hasEditedJob,
		resetCreateJob,
		resetEditJob,
		selectedJob,
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
		data => {
			const payload = {
				...data,
				mailQuery: `from:${data.email},has:attachment`,
			}

			if (isAdd) createJob(payload)
			else editJob(selectedJob.id, payload)
		},
		[isAdd, createJob, editJob, selectedJob]
	)

	React.useEffect(() => {
		if (hasCreatedJob || hasEditedJob) {
			toast(`Successfully ${isAdd ? 'created' : 'updated'} job`, TOAST.SUCCESS)
			reset()
			resetCreateJob()
			resetEditJob()
			onClose()
		}
	}, [
		isAdd,
		hasCreatedJob,
		hasEditedJob,
		toast,
		reset,
		resetCreateJob,
		resetEditJob,
		onClose,
	])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('name')}
				sx={textFieldStyle}
				defaultValue={selectedJob?.name}
				error={!!errors?.name}
				label="Name"
				variant="outlined"
				size="small"
				helperText={errors?.name?.message ?? 'Unique name for this job'}
			/>
			<TextField
				{...register('email')}
				sx={textFieldStyle}
				defaultValue={getMailFromQuery(selectedJob?.mailQuery)}
				error={!!errors?.email}
				label="Sender Email Address"
				variant="outlined"
				size="small"
				helperText={
					errors?.email?.message ??
					'Sender email address to filter email that you want to extract'
				}
			/>
			<TextField
				{...register('folderName')}
				sx={textFieldStyle}
				defaultValue={selectedJob?.folderName}
				error={!!errors?.folderName}
				label="Folder Name"
				variant="outlined"
				size="small"
				helperText={
					errors?.folderName?.message ??
					"Folder will be created at your Google Drive's root path"
				}
			/>
			<LoadingButton
				disableRipple
				disableElevation
				sx={{ mt: 4 }}
				variant="contained"
				loading={isAdd ? isCreatingJob : isEditingJob}
				loadingPosition="start"
				startIcon={<AddIcon />}
				type="submit"
			>
				{isAdd ? 'Create' : 'Save'}
			</LoadingButton>
		</form>
	)
}

export default React.memo(Form)
