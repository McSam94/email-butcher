import servicer from '@/services/index'

export const login = () => {
	return servicer.post('/login')
}
