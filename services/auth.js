import ApiUtil from '@/services/index'

const { post, get } = ApiUtil

const AuthSrv = {
	login: () =>
		post('/login', {
			redirectUrl: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI,
		}),
	getProfile: () => get('/user/me'),
}

export default AuthSrv
