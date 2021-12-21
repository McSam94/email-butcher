/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import AuthSrv from '@/services/auth'
import { generateRequestActions } from '@/utilities/request'

export const authAction = Object.freeze({
	SET_STATE: 'setState',
	LOGIN: 'login',
	LOGOUT: generateRequestActions('logout'),
	FINISH_LOGIN: 'finishLogin',
	PROFILE: generateRequestActions('profile'),
})

export const setState = dispatch =>
	React.useCallback(
		state => dispatch({ type: authAction.SET_STATE, payload: { state } }),
		[dispatch]
	)

export const login = dispatch =>
	React.useCallback(
		token => {
			dispatch({ type: authAction.LOGIN, payload: { token } })
		},
		[dispatch]
	)

export const logout = dispatch =>
	React.useCallback(async () => {
		dispatch({ type: authAction.LOGOUT.REQUEST })

		try {
			const { success, error } = await AuthSrv.logout()

			if (success) {
				dispatch({ type: authAction.LOGOUT.SUCCESS })
				dispatch({ type: authAction.PROFILE.RESET })
			} else throw new Error(error)
		} catch (error) {
			dispatch({ type: authAction.LOGOUT.FAIL, payload: { error } })
		}
	}, [dispatch])

export const finishLogin = dispatch =>
	React.useCallback(
		() => dispatch({ type: authAction.FINISH_LOGIN }),
		[dispatch]
	)

export const getProfile = dispatch =>
	React.useCallback(async () => {
		dispatch({ type: authAction.PROFILE.REQUEST })

		try {
			const { success, data, error } = await AuthSrv.getProfile()

			if (success)
				dispatch({
					type: authAction.PROFILE.SUCCESS,
					payload: { profile: data },
				})
			else throw new Error(error)
		} catch (error) {
			dispatch({ type: authAction.PROFILE.FAIL, payload: { error } })
		}
	}, [dispatch])
