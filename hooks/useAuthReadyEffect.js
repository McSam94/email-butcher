import * as React from 'react'
import { useAuthStore } from '@/store/auth'

export default function useAuthReadyEffect(fn, deps) {
	const { isReady } = useAuthStore()

	React.useEffect(() => {
		if (!isReady) return

		fn?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, isReady])
}
