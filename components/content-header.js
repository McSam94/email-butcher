import { Box, Typography } from '@mui/material'
import * as React from 'react'

const ContentHeader = ({ title, description }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100px',
				py: 4,
			}}
		>
			<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
				{title}
			</Typography>
			{description && (
				<Typography variant="subtitle1">{description}</Typography>
			)}
		</Box>
	)
}

export default React.memo(ContentHeader)
