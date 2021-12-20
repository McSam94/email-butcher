/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'

export const authAction = Object.freeze({
	SET_STATE: 'setState',
	LOGIN: 'login',
	LOGOUT: 'logout',
	FINISH_LOGIN: 'finishLogin',
})

export const setState = dispatch =>
	React.useCallback(
		state => dispatch({ type: authAction.SET_STATE, payload: { state } }),
		[dispatch]
	)

export const login = dispatch =>
	React.useCallback(
		token => dispatch({ type: authAction.LOGIN, payload: { token } }),
		[dispatch]
	)

export const logout = dispatch =>
	React.useCallback(() => dispatch({ type: authAction.LOGOUT }), [dispatch])

export const finishLogin = dispatch =>
	React.useCallback(
		() => dispatch({ type: authAction.FINISH_LOGIN }),
		[dispatch]
	)
