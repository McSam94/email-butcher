import axios from 'axios'

const ApiUtil = () => {
	const apiClient = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	})

	apiClient.interceptors.response.use(response => {
		return response?.data
	})

	const injectToken = (token, cb) => {
		if (!token) {
			cb?.()
			return
		}
		apiClient.defaults.headers.Authorization = `Bearer ${token}`
		cb?.()
	}

	const removeToken = () => {
		delete apiClient.defaults.headers.common.Authorization
	}

	const requestTypeClient = apiClient
	return { ...requestTypeClient, injectToken, removeToken }
}

export default ApiUtil()
