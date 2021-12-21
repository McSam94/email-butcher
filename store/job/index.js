/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import { createJob, resetCreateJob } from './actions'
import { JobReducer } from './reducer'

const STORE_NAME = 'JobStore'

export const { Context: JobContext, Provider: JobProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: JobReducer,
		actions: {
			createJob,
			resetCreateJob,
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
