/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import JobSrv from '@/services/job'
import {
	generateRequestActions,
	generateToggleActions,
} from '@/utilities/request'

export const jobActions = Object.freeze({
	SET_STATE: 'setState',
	SELECT_JOB: generateToggleActions('selectJob'),
	INSTANT_JOB: generateRequestActions('instantJob'),
	CREATE_JOB: generateRequestActions('createJob'),
	EDIT_JOB: generateRequestActions('editJob'),
	RUN_JOB: generateRequestActions('runJob'),
	GET_JOBS: generateRequestActions('getJobs'),
	DELETE_JOB: generateRequestActions('deleteJob'),
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
				const { success, data, error } = await JobSrv.createJob(job)

				if (!success) throw new Error(error)
				dispatch({
					type: jobActions.CREATE_JOB.SUCCESS,
					payload: { job: data },
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

export const editJob = dispatch =>
	React.useCallback(
		async (id, job) => {
			dispatch({ type: jobActions.EDIT_JOB.REQUEST })

			try {
				const { success, data, error } = await JobSrv.editJob(id, job)

				if (!success) throw new Error(error)
				dispatch({
					type: jobActions.EDIT_JOB.SUCCESS,
					payload: { job: data },
				})
			} catch (error) {
				dispatch({ type: jobActions.EDIT_JOB.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetEditJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.EDIT_JOB.RESET }),
		[dispatch]
	)

export const runJob = dispatch =>
	React.useCallback(
		async id => {
			dispatch({ type: jobActions.RUN_JOB.REQUEST, payload: { id } })

			try {
				const { success, data, error } = await JobSrv.runJob(id)

				if (!success) throw new Error(error)
				dispatch({
					type: jobActions.RUN_JOB.SUCCESS,
					payload: { job: data },
				})
			} catch (error) {
				dispatch({ type: jobActions.RUN_JOB.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetRunJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.RUN_JOB.RESET }),
		[dispatch]
	)

const getJobsFn = async (dispatch, params) => {
	dispatch({ type: jobActions.GET_JOBS.REQUEST })

	try {
		const {
			success,
			data: { results, pagination },
			error,
		} = await JobSrv.getJobs({
			...params,
			paginationMeta: true,
		})

		if (!success) throw new Error(error)
		dispatch({
			type: jobActions.GET_JOBS.SUCCESS,
			payload: { jobs: results, pagination },
		})
	} catch (error) {
		dispatch({ type: jobActions.GET_JOBS.FAIL, payload: { error } })
	}
}

export const getJobs = (dispatch, { pagination: { limit, current } }) =>
	React.useCallback(
		async (search = '') => {
			getJobsFn(dispatch, {
				limit,
				page: current,
				...(search ? { name: search } : {}),
			})
		},
		[dispatch, limit, current]
	)

export const resetGetJobs = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.GET_JOBS.RESET }, [dispatch]),
		[dispatch]
	)

export const getPageJobs = (dispatch, { pagination: { limit } }) =>
	React.useCallback(
		async newPage => {
			getJobsFn(dispatch, {
				limit,
				page: newPage,
			})
		},
		[dispatch, limit]
	)

export const updatePageSize = (dispatch, { pagination: { current } }) =>
	React.useCallback(
		async newLimit => {
			getJobsFn(dispatch, {
				limit: newLimit,
				current,
			})
		},
		[dispatch, current]
	)

export const selectJob = dispatch =>
	React.useCallback(
		job => dispatch({ type: jobActions.SELECT_JOB.ON, payload: { job } }),
		[dispatch]
	)

export const removeSelectedJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.SELECT_JOB.OFF }),
		[dispatch]
	)

export const deleteJob = dispatch =>
	React.useCallback(
		async id => {
			dispatch({ type: jobActions.DELETE_JOB.REQUEST })

			try {
				const { success, error } = await JobSrv.deleteJob(id)

				if (!success) throw new Error(error)

				dispatch({ type: jobActions.DELETE_JOB.SUCCESS })
			} catch (error) {
				dispatch({ type: jobActions.DELETE_JOB.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetDeleteJob = dispatch =>
	React.useCallback(
		() => dispatch({ type: jobActions.DELETE_JOB.RESET }),
		[dispatch]
	)
