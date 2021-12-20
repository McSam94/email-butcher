import servicer from '@/services/index'

export const login = () => {
	return servicer.post('/login', {
		redirectUrl: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI,
	})
}
