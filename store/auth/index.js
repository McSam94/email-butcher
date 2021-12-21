/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import { login, logout, finishLogin, getProfile, setState } from './actions'
import { AuthReducer } from './reducer'

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
			getProfile,
		},
		initialState: {
			token: null,
			isLoggedIn: false,
			justLoggedIn: false,

			isGettingProfile: false,
			hasGotProfile: false,
			profile: {},
			getProfileError: null,
		},
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initAuthState = () => {
	const { setState } = React.useContext(AuthContext)

	React.useEffect(() => {
		const persistState = getInitialState(STORE_NAME)
		if (persistState) {
			setState(persistState)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export const useAuthStore = () => {
	return React.useContext(AuthContext)
}
