/* eslint-disable react-hooks/rules-of-hooks */
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import { login, logout, finishLogin, setState } from './actions'
import { AuthReducer } from './reducer'
import * as React from 'react'

const STORE_NAME = 'AuthStore'

export const { Context: AuthContext, Provider: AuthProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: AuthReducer,
		actions: {
			login,
			logout,
			setState,
			finishLogin,
		},
		initialState: {
			token: null,
			isLoggedIn: false,
			justLoggedIn: false,
		},
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initAuthState = () => {
	const { setState } = React.useContext(AuthContext)

	React.useEffect(() => {
		setState(getInitialState(STORE_NAME))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useAuthStore = () => {
	return React.useContext(AuthContext)
}
