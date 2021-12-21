import axios from 'axios'

const ApiUtil = () => {
	const apiClient = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
		timeout: 300000,
	})

	apiClient.interceptors.response.use(response => {
		return response?.data
	})

	const injectToken = token => {
		if (!token) return
		apiClient.defaults.headers.Authorization = `Bearer ${token}`
	}

	const removeToken = () => {
		delete apiClient.defaults.headers.common.Authorization
	}

	const requestTypeClient = apiClient
	return { ...requestTypeClient, injectToken, removeToken }
}

export default ApiUtil()
