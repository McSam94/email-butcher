import * as React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const DeleteDialog = ({
	isOpen,
	onClose,
	title,
	description,
	isDeleting,
	onDelete,
}) => {
	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					bgcolor: 'background.paper',
					width: 500,
					height: 200,
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					position: 'absolute',
					p: 4,
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 'medium' }}>
					{title}
				</Typography>
				<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
					{description}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						variant="text"
						sx={{ color: 'text.secondary' }}
						onClick={onClose}
					>
						Cancel
					</Button>
					<LoadingButton
						variant="contained"
						color="error"
						sx={{ ml: 2 }}
						onClick={onDelete}
						loading={isDeleting}
					>
						Delete
					</LoadingButton>
				</Box>
			</Box>
		</Modal>
	)
}

export default React.memo(DeleteDialog)
