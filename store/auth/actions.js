/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'

export const authAction = Object.freeze({
	SET_STATE: 'setState',
	SET_ACCESS_TOKEN: 'setAccessToken',
})

export const setState = dispatch => {
	return useCallback(
		state => {
			console.log('🚀 ~ file: actions.js ~ line 12 ~ state', state)
			dispatch({ type: authAction.SET_STATE, payload: { state } })
		},
		[dispatch]
	)
}

export const setAccessToken = dispatch => {
	return useCallback(
		token => {
			dispatch({ type: authAction.SET_ACCESS_TOKEN, payload: { token } })
		},
		[dispatch]
	)
}
