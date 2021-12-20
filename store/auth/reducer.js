import { authAction } from './actions'

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case authAction.SET_ACCESS_TOKEN:
			return {
				...state,
				token: action?.payload?.token,
			}
		case authAction.SET_STATE: {
			return {
				...action?.payload?.state,
			}
		}
		default:
			throw new Error(`Invalid Action ${action.type}`)
	}
}
