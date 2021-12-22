/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import {
	createJob,
	instantJob,
	resetCreateJob,
	resetInstantJob,
	getInitialJobs,
	getPageJobs,
	updatePageSize,
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
			createJob,
			resetCreateJob,
			getInitialJobs,
			getPageJobs,
			updatePageSize,
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
