/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import AuthSrv from '@/services/auth'
import { generateRequestActions } from '@/utilities/request'
import ApiUtils from '@/services/index'

export const authAction = Object.freeze({
	SET_STATE: 'setState',
	SET_READY: 'setReady',
	LOGIN: 'login',
	LOGOUT: 'logout',
	FINISH_LOGIN: 'finishLogin',
	REMEMBER_ROUTE: 'rememberRoute',
	PROFILE: generateRequestActions('profile'),
	UPDATE_TOKEN: generateRequestActions('updateToken'),
})

export const setReady = dispatch =>
	React.useCallback(() => dispatch({ type: authAction.SET_READY }), [dispatch])

export const setState = dispatch =>
	React.useCallback(
		state => dispatch({ type: authAction.SET_STATE, payload: { state } }),
		[dispatch]
	)

export const login = dispatch =>
	React.useCallback(
		token => {
			dispatch({ type: authAction.LOGIN, payload: { token } })
			ApiUtils.injectToken(token)
		},
		[dispatch]
	)

export const logout = dispatch =>
	React.useCallback(
		async () => dispatch({ type: authAction.LOGOUT }),
		[dispatch]
	)

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

export const resetGetProfile = dispatch =>
	React.useCallback(
		() => dispatch({ type: authAction.PROFILE.RESET }),
		[dispatch]
	)

export const updateToken = dispatch =>
	React.useCallback(
		async code => {
			dispatch({ type: authAction.UPDATE_TOKEN.REQUEST })

			try {
				const { success, error } = await AuthSrv.updateToken({
					type: 'google',
					authCode: code,
				})

				if (success) dispatch({ type: authAction.UPDATE_TOKEN.SUCCESS })
				else throw new Error(error)
			} catch (error) {
				dispatch({ type: authAction.UPDATE_TOKEN.FAIL, payload: { error } })
			}
		},
		[dispatch]
	)

export const resetUpdateToken = dispatch =>
	React.useCallback(
		() => dispatch({ type: authAction.UPDATE_TOKEN.RESET }),
		[dispatch]
	)

export const rememberRoute = dispatch =>
	React.useCallback(
		route => dispatch({ type: authAction.REMEMBER_ROUTE, payload: { route } }),
		[dispatch]
	)
