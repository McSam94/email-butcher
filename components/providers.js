import * as React from 'react'
import { AuthProvider } from '@/store/auth'
import { UiProvider } from '@/store/ui'
import { JobProvider } from '@/store/job'

const Providers = ({ children }) => {
	return (
		<UiProvider>
			<AuthProvider>
				<JobProvider>{children}</JobProvider>
			</AuthProvider>
		</UiProvider>
	)
}

export default Providers
