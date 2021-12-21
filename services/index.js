import axios from 'axios'

const ApiUtil = () => {
	let accessToken = null

	const apiClient = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	})

	apiClient.interceptors.request.use(request => {
		if (!accessToken) return request

		return {
			...request,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	})

	apiClient.interceptors.response.use(response => {
		return response?.data
	})

	const injectToken = token => (accessToken = token)

	const removeToken = () => {
		delete apiClient.defaults.headers.common.Authorization
		accessToken = null
	}

	const requestTypeClient = apiClient
	return { ...requestTypeClient, injectToken, removeToken }
}

export default ApiUtil()
