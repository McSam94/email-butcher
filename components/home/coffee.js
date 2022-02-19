import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import CoffeeIcon from '@mui/icons-material/Coffee'
import { useRouter } from 'next/router'

const Coffee = () => {
	const { push } = useRouter()

	const goToBuyMeCoffee = React.useCallback(() => {
		push('https://buymeacoffee.com/emailButcher')
	}, [push])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				my: 8,
			}}
		>
			<Typography
				variant="h4"
				fontWeight="bold"
				color="secondary.light"
				sx={{ mb: 2 }}
			>
				Like our work?
			</Typography>
			<Button onClick={goToBuyMeCoffee} startIcon={<CoffeeIcon />}>
				Buy us coffee
			</Button>
		</Box>
	)
}

export default Coffee
