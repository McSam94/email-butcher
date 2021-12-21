const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'
const RESET = 'RESET'

export const generateRequestActions = base => ({
	[REQUEST]: `${base}_${REQUEST}`,
	[SUCCESS]: `${base}_${SUCCESS}`,
	[FAIL]: `${base}_${FAIL}`,
	[RESET]: `${base}_${RESET}`,
})

const ON = 'ON'
const OFF = 'OFF'

export const generateToggleActions = base => ({
	[ON]: `${base}_${ON}`,
	[OFF]: `${base}_${OFF}`,
})

export const convertObjToParams = obj => {
	return `?${Object.entries(obj).reduce(
		(accRes, [key, value]) => `${accRes}${accRes ? '&' : ''}${key}=${value}`,
		''
	)}`
}
