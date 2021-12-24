/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import ApiUtils from '@/services/index'
import {
	login,
	logout,
	finishLogin,
	getProfile,
	setState,
	setReady,
} from './actions'
import { AuthReducer } from './reducer'

const STORE_NAME = 'AuthStore'

const initialState = {
	token: null,
	isLoggedIn: false,
	justLoggedIn: false,

	isLoggingOut: false,
	hasLoggedOut: false,
	logoutError: null,

	isGettingProfile: false,
	hasGotProfile: false,
	profile: {},
	getProfileError: null,
}

export const { Context: AuthContext, Provider: AuthProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: AuthReducer,
		actions: {
			login,
			logout,
			setState,
			setReady,
			finishLogin,
			getProfile,
		},
		initialState,
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initAuthState = () => {
	const { setState } = useAuthStore()

	React.useEffect(() => {
		const persistState = getInitialState(STORE_NAME)
		if (persistState) {
			setState(persistState)
			ApiUtils.injectToken(persistState?.token)
		}
	}, [setState])
}

export const useAuthStore = () => {
	return React.useContext(AuthContext)
}
