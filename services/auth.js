import ApiUtil from '@/services/index'

const { post, get } = ApiUtil

const redirectBody = {
	redirectUrl: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI,
}

const AuthSrv = {
	login: () => post('/login', redirectBody),
	logout: () => post('/logout', redirectBody),
	getProfile: () => get('/user/me'),
}

export default AuthSrv
