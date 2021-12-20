/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import { toast, closeToast, setState } from './actions'
import { UiReducer } from './reducer'

const STORE_NAME = 'UiStore'

export const { Context: UiContext, Provider: UiProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: UiReducer,
		actions: {
			toast,
			closeToast,
			setState,
		},
		initialState: {
			toasts: [],
		},
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initUiState = () => {
	const { setState } = React.useContext(UiContext)

	React.useEffect(() => {
		setState(getInitialState(STORE_NAME))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useUiStore = () => {
	return React.useContext(UiContext)
}
