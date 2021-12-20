/* eslint-disable react-hooks/rules-of-hooks */
import { getInitialState } from '@/utilities/local-storage'
import useReducerContext from '@/hooks/useReducerContext'
import { setAccessToken, setState } from './actions'
import { AuthReducer } from './reducer'
import * as React from 'react'

const STORE_NAME = 'AuthStore'

export const { Context: AuthContext, Provider: AuthProvider } =
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useReducerContext({
		reducer: AuthReducer,
		actions: {
			setAccessToken,
			setState,
		},
		initialState: {
			token: null,
		},
		displayName: STORE_NAME,
		shouldPersist: true,
	})

export const initAuthState = () => {
	const { setState } = React.useContext(AuthContext)

	React.useEffect(() => {
		console.log(
			'🚀 ~ file: index.js ~ line 30 ~ React.useEffect ~ getInitialState(STORE_NAME)',
			getInitialState(STORE_NAME)
		)
		setState(getInitialState(STORE_NAME))
	}, [setState])
}
