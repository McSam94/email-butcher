import AuthSrv from '@/services/auth'

export const checkPermission = async () => {
	try {
		const { success, data, error } = await AuthSrv.checkGooglePermission()

		if (!success) throw new Error(error)

		return data
	} catch (error) {
		console.error(error) // eslint-disable-line no-console
	}
}
