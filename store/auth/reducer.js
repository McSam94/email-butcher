import { authAction } from './actions'

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case authAction.SET_STATE: {
			return {
				...action?.payload?.state,
			}
		}
		case authAction.LOGIN:
			return {
				...state,
				token: action?.payload?.token,
				isLoggedIn: true,
				justLoggedIn: true,
			}
		case authAction.FINISH_LOGIN:
			return {
				...state,
				justLoggedIn: false,
			}
		case authAction.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				justLoggedIn: false,
				token: null,
			}
		default:
			throw new Error(`Invalid Action ${action.type}`)
	}
}
