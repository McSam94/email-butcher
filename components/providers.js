import * as React from 'react'
import { AuthProvider } from '@/store/auth'
import { UiProvider } from '@/store/ui'

const Providers = ({ children }) => {
	return (
		<UiProvider>
			<AuthProvider>{children}</AuthProvider>
		</UiProvider>
	)
}

export default Providers
