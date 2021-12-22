import { jobActions } from './actions'

export const JobReducer = (state, action) => {
	switch (action.type) {
		case jobActions.SET_STATE:
			return {
				...action?.payload?.state,
			}
		case jobActions.INSTANT_JOB.REQUEST:
			return {
				...state,
				isInstantingJob: true,
			}
		case jobActions.INSTANT_JOB.SUCCESS:
			return {
				...state,
				isInstantingJob: false,
				hasInstantJob: true,
				instantJob: action?.payload?.job,
			}
		case jobActions.INSTANT_JOB.FAIL:
			return {
				...state,
				isInstantingJob: false,
				hasInstantJob: false,
				instantJobError: action?.payload?.error,
			}
		case jobActions.INSTANT_JOB.RESET:
			return {
				...state,
				isInstantingJob: false,
				hasInstantJob: false,
				instantJob: null,
				instantJobError: null,
			}
		case jobActions.CREATE_JOB.REQUEST:
			return {
				...state,
				isCreatingJob: true,
			}
		case jobActions.CREATE_JOB.SUCCESS:
			return {
				...state,
				isCreatingJob: false,
				hasCreatedJob: true,
				createdJob: action?.payload?.job,
			}
		case jobActions.CREATE_JOB.FAIL:
			return {
				...state,
				isCreatingJob: false,
				hasCreatedJob: false,
				createJobError: action?.payload?.error,
			}
		case jobActions.CREATE_JOB.RESET:
			return {
				...state,
				isCreatingJob: false,
				hasCreatedJob: false,
				createdJob: null,
				createJobError: null,
			}
		case jobActions.RUN_JOB.REQUEST:
			return {
				...state,
				isRunningJob: true,
			}
		case jobActions.RUN_JOB.SUCCESS:
			return {
				...state,
				isRunningJob: false,
				hasJobRan: true,
				ranJob: action?.payload?.job,
			}
		case jobActions.RUN_JOB.FAIL:
			return {
				...state,
				isRunningJob: false,
				hasJobRan: false,
				runJobError: action?.payload?.error,
			}
		case jobActions.RUN_JOB.RESET:
			return {
				...state,
				isRunningJob: false,
				hasJobRan: false,
				ranJob: null,
				runJobError: null,
			}
		case jobActions.GET_JOBS.REQUEST:
			return {
				...state,
				isGettingJobs: true,
			}
		case jobActions.GET_JOBS.SUCCESS:
			return {
				...state,
				isGettingJobs: false,
				hasGotJobs: true,
				jobs: action?.payload?.jobs ?? null,
				pagination: action?.payload?.pagination ?? state.pagination,
			}
		case jobActions.GET_JOBS.FAIL:
			return {
				...state,
				isGettingJobs: false,
				hasGotJobs: false,
				getJobError: action?.payload?.error,
			}
		case jobActions.GET_JOBS.RESET:
			return {
				...state,
				isGettingJobs: false,
				hasGotJobs: false,
				jobs: null,
				getJobError: null,
				pagination: {
					current: 1,
					limit: 25,
					totalItems: 0,
					totalPages: 0,
				},
			}
		default:
			throw new Error(`Invalid Action ${action.type}`)
	}
}
