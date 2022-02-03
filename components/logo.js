import useResponsive from '@/hooks/useResponsive'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'

const Logo = ({ size, onlyLogo = false }) => {
	const { push } = useRouter()
	const { isMobile } = useResponsive()

	const variant = React.useMemo(() => {
		switch (size) {
			case 's':
				return 'h6'
			case 'm':
				return 'h4'
			case 'l':
				return 'h2'
			default:
				return 'caption'
		}
	}, [size])

	const logoSize = React.useMemo(() => {
		switch (size) {
			case 's':
				return 25
			case 'm':
				return 40
			case 'l':
				return 55
			default:
				return 20
		}
	}, [size])

	const onLogoClick = React.useCallback(() => {
		push('/')
	}, [push])

	return (
		<Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
			<Image
				src="/images/logo.svg"
				height={logoSize}
				width={logoSize}
				layout="intrinsic"
				alt="logo"
			/>
			{!onlyLogo && (
				<Typography
					sx={{
						marginLeft: '12px',
						fontWeight: 'bold',
						fontFamily: 'sans-serif',
						color: 'primary.main',
						cursor: 'pointer',
					}}
					variant={variant}
					onClick={onLogoClick}
				>
					Email Butcher
				</Typography>
			)}
		</Box>
	)
}

export default React.memo(Logo)
