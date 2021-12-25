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
	updateToken,
	resetUpdateToken,
	resetGetProfile,
	rememberRoute,
} from '@/store/auth/actions'
import { AuthReducer } from '@/store/auth/reducer'

const STORE_NAME = 'AuthStore'

const initialState = {
	isReady: false,

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

	isUpdatingToken: false,
	hasUpdatedToken: false,
	updateTokenError: null,

	previousRoute: '/',
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
			updateToken,
			resetUpdateToken,
			resetGetProfile,
			rememberRoute,
		},
		initialState,
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const useAuthStore = () => {
	return React.useContext(AuthContext)
}

export const initAuthState = () => {
	const { setState } = useAuthStore()

	React.useEffect(() => {
		const persistState = getInitialState(STORE_NAME)
		if (persistState) {
			setState({ ...persistState, isReady: true })
			ApiUtils.injectToken(persistState?.token)
		}
	}, [setState])
}
