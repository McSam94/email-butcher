import useResponsive from '@/hooks/useResponsive'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

const Footer = () => {
	const { push } = useRouter()
	const { isMobile } = useResponsive()

	const goToPrivacy = React.useCallback(() => {
		push(process.env.NEXT_PUBLIC_PRIVACY_URL)
	}, [push])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				justifyContent: 'space-between',
				alignItems: isMobile ? 'flex-start' : 'center',
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
