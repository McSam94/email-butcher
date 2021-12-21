/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import JobSrv from '@/services/job'
import { generateRequestActions } from '@/utilities/request'

export const jobActions = Object.freeze({
	SET_STATE: 'setState',
	INSTANT_JOB: generateRequestActions('instantJob'),
	CREATE_JOB: generateRequestActions('createJob'),
	RUN_JOB: generateRequestActions('runJob'),
})

export const setState = dispatch =>
	React.useCallback(
		state => dispatch({ type: jobActions.SET_STATE, payload: { state } }),
		[dispatch]
	)

export const instantJob = dispatch =>
	React.useCallback(
		async job => {
			dispatch({ type: jobActions.INSTANT_JOB.REQUEST })

			try {
				const { success, data, error } = await JobSrv.instantJob(job)

				if (!success) throw new Error(error)

				dispatch({
					type: jobActions.INSTANT_JOB.SUCCESS,
					payload: { job: data },
				})
			} catch (error) {
				dispatch({ type: jobActions.INSTANT_JOB.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetInstantJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.INSTANT_JOB.RESET }),
		[dispatch]
	)

export const createJob = dispatch =>
	React.useCallback(
		async job => {
			dispatch({ type: jobActions.CREATE_JOB.REQUEST })

			try {
				const {
					success: createJobSuccess,
					data: createdJob,
					error: createJobError,
				} = await JobSrv.createJob(job)

				if (!createJobSuccess) throw new Error(createJobError)

				dispatch({
					type: jobActions.CREATE_JOB.SUCCESS,
					payload: { job: createdJob },
				})

				const {
					success: runJobSuccess,
					data: ranJob,
					error: runJobError,
				} = await JobSrv.runJob(createdJob.id)

				if (!runJobSuccess)
					dispatch({
						type: jobActions.CREATE_JOB.FAIL,
						payload: { runJobError },
					})

				dispatch({
					type: jobActions.RUN_JOB.SUCCESS,
					payload: { job: ranJob },
				})
			} catch (error) {
				dispatch({ type: jobActions.CREATE_JOB.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetCreateJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.CREATE_JOB.RESET }),
		[dispatch]
	)
