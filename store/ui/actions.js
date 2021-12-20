/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'

export const uiAction = Object.freeze({
	SET_STATE: 'setState',
	TOAST: 'toast',
	CLOSE_TOAST: 'closeToast',
})

export const setState = dispatch =>
	React.useCallback(
		state => dispatch({ type: uiAction.SET_STATE, payload: { state } }),
		[dispatch]
	)

export const toast = dispatch =>
	React.useCallback(
		(message, type) =>
			dispatch({ type: uiAction.TOAST, payload: { message, type } }),
		[dispatch]
	)

export const closeToast = dispatch =>
	React.useCallback(
		index => dispatch({ type: uiAction.CLOSE_TOAST, payload: { index } }),
		[dispatch]
	)
