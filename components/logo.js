import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

const Logo = ({ size }) => {
	const { push } = useRouter()

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

	const onLogoClick = React.useCallback(() => {
		push('/')
	}, [push])

	return (
		<Typography
			sx={{
				fontWeight: 'bold',
				fontFamily: 'sans-serif',
				color: 'primary.main',
				cursor: 'pointer',
			}}
			variant={variant}
			onClick={onLogoClick}
		>
			Email Butler
		</Typography>
	)
}

export default React.memo(Logo)
