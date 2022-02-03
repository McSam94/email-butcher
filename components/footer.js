import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

const Footer = () => {
	const { push } = useRouter()

	const goToPrivacy = React.useCallback(() => {
		push(process.env.NEXT_PUBLIC_PRIVACY_URL)
	}, [push])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: 'grey.200',
				p: 4,
			}}
		>
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ ':hover': { color: 'text.primary', cursor: 'pointer' } }}
				onClick={goToPrivacy}
			>
				Privacy Policy
			</Typography>
			<Typography variant="caption" color="text.secondary">
				{`Copyright © ${new Date().getFullYear()} Email Butcher. All rights reserved.`}
			</Typography>
		</Box>
	)
}

export default Footer
