import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import Coffee from '@mui/icons-material/Coffee'
import { useRouter } from 'next/router'

const About = () => {
	const { push } = useRouter()

	const goToBuyMeCoffee = React.useCallback(() => {
		push('https://buymeacoffee.com/emailButcher')
	}, [push])

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Typography
				variant="h4"
				fontWeight="bold"
				color="secondary"
				sx={{ mb: 2 }}
			>
				Like our work?
			</Typography>
			<Button onClick={goToBuyMeCoffee} startIcon={<Coffee />}>
				Buy us coffee
			</Button>
		</Box>
	)
}

export default About
