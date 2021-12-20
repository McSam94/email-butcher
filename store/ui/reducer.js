import { uiAction } from './actions'

export const UiReducer = (state, action) => {
	switch (action.type) {
		case uiAction.SET_STATE: {
			return {
				...action?.payload?.state,
			}
		}
		case uiAction.TOAST:
			return {
				...state,
				toasts: [
					...state.toasts,
					{
						message: action?.payload?.message,
						type: action?.payload?.type,
					},
				],
			}
		case uiAction.CLOSE_TOAST:
			return {
				...state,
				toasts: [
					...state.toasts.filter(
						(_, index) => index !== action?.payload?.index
					),
				],
			}
		default:
			throw new Error(`Invalid Action ${action.type}`)
	}
}
