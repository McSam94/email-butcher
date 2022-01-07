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

	const injectLogout = logout => {
		apiClient.interceptors.response.use(
			response => {
				return response
			},
			async err => {
				if (err.response.status === 401) {
					const {
						data: { url },
					} = await apiClient.post('/logout', {
						redirectUrl: `${process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI}/redirect`,
					})

					logout?.()
					if (window) window.location.href = url
				}
			}
		)
	}

	const removeToken = () => {
		delete apiClient.defaults.headers.common.Authorization
	}

	const requestTypeClient = apiClient
	return { ...requestTypeClient, injectToken, removeToken, injectLogout }
}

export default ApiUtil()
