import * as React from 'react'
import { Box, Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Form from '@/components/schedule/add-edit/form'
import ContentHeader from '@/components/content-header'
import useResponsive from '@/hooks/useResponsive'

const AddEdit = ({ isAdd, isOpen, onClose }) => {
	const { isMobile } = useResponsive()

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box
				sx={{
					bgcolor: 'background.paper',
					width: isMobile ? '100%' : '40%',
					height: isMobile ? '100%' : '60%',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					position: 'absolute',
					p: 4,
				}}
			>
				<IconButton
					sx={{ position: 'absolute', right: 10, top: 10 }}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<ContentHeader title={isAdd ? 'Create Job' : 'Edit Job'} />
					<Form isAdd={isAdd} onClose={onClose} />
				</Box>
			</Box>
		</Modal>
	)
}

export default AddEdit
