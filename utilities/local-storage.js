export const persistState = (storageKey, state) => {
	window.localStorage.setItem(storageKey, JSON.stringify(state))
}

export const getInitialState = storageKey => {
	const savedState = window.localStorage.getItem(storageKey)
	try {
		if (!savedState) {
			return undefined
		}
		return JSON.parse(savedState || '{}')
	} catch (e) {
		throw new Error(e)
	}
}

export const removeState = storageKey => {
	window.localStorage.removeItem(storageKey)
}
