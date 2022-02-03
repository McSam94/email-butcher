import { Box, Typography } from '@mui/material'
import * as React from 'react'
import useResponsive from '@/hooks/useResponsive'

const ContentHeader = ({ title, description, style }) => {
	const { isMobile } = useResponsive()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100px',
				...style,
			}}
		>
			<Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>
				{title}
			</Typography>
			{!isMobile && description && (
				<Typography variant="subtitle1" color="secondary.light">
					{description}
				</Typography>
			)}
		</Box>
	)
}

export default React.memo(ContentHeader)
