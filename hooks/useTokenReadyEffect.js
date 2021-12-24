import * as React from 'react'
import { useAuthStore } from '@/store/auth'

export default function useTokenReadyEffect(fn, deps) {
	const { token } = useAuthStore()

	React.useEffect(() => {
		if (!token) return

		fn?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, token])
}
