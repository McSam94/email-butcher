import * as React from 'react'
import { AuthProvider } from '@/store/auth'

const Providers = ({ children }) => {
	return <AuthProvider>{children}</AuthProvider>
}

export default Providers
