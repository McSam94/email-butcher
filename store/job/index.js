/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import {
	createJob,
	editJob,
	instantJob,
	resetInstantJob,
	getJobs,
	getPageJobs,
	updatePageSize,
	selectJob,
	removeSelectedJob,
	resetEditJob,
	resetCreateJob,
	deleteJob,
	resetDeleteJob,
} from './actions'
import { JobReducer } from '@/store/job/reducer'

const STORE_NAME = 'JobStore'

export const { Context: JobContext, Provider: JobProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: JobReducer,
		actions: {
			instantJob,
			resetInstantJob,
			editJob,
			createJob,
			getJobs,
			getPageJobs,
			updatePageSize,
			selectJob,
			removeSelectedJob,
			resetCreateJob,
			resetEditJob,
			deleteJob,
			resetDeleteJob,
		},
		initialState: {
			isCreatingJob: false,
			hasCreatedJob: false,
			createdJob: null,
			createJobError: null,

			isJobRunning: false,
			hasJobRan: false,
			ranJob: null,
			runJobError: null,

			isInstantingJob: false,
			hasInstantJob: false,
			instantJob: null,
			instantJobError: null,

			isGettingJobs: false,
			hasGotJobs: false,
			jobs: null,
			getJobsError: null,
			pagination: {
				current: 1,
				limit: 25,
				totalItems: 0,
				totalPages: 0,
			},

			selectedJob: null,

			isEditingJob: false,
			hasEditedJob: false,
			editedJob: null,
			editJobError: null,

			isDeletingJob: false,
			hasDeletedJob: false,
			deleteJobError: null,
		},
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initAuthState = () => {
	const { setState } = React.useContext(JobContext)

	React.useEffect(() => {
		const persistState = getInitialState(STORE_NAME)
		if (persistState) {
			setState(persistState)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useJobStore = () => {
	return React.useContext(JobContext)
}
