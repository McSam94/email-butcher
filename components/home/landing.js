import * as React from 'react'
import { Box, Typography } from '@mui/material'
import Logo from '@/components/logo'

const Landing = () => {
	return (
		<Box sx={{ maxWidth: '480px', alignSelf: 'center' }}>
			<Logo size="l" />
			<Typography
				variant="h6"
				sx={{ color: 'secondary.main', fontWeight: 'bold' }}
			>
				Finding that piece of meat ✉️ you want.
			</Typography>
		</Box>
	)
}

export default Landing
