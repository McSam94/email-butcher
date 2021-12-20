import axios from 'axios'

const servicer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

servicer.interceptors.response.use(response => {
	return response?.data
})

export default servicer
