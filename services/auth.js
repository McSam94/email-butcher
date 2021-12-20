import servicer from '@/services/index'

const AuthSrv = {
	login: () =>
		servicer.post('/login', {
			redirectUrl: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI,
		}),
}

export default AuthSrv
