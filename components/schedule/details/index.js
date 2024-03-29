import * as React from 'react'
import { Box, Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useJobStore } from '@/store/job'
import Results from '@/components/schedule/details/results'
import useResponsive from '@/hooks/useResponsive'

const Details = ({ isOpen, onClose }) => {
	const { selectedJob } = useJobStore()
	const { isMobile } = useResponsive()

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box
				sx={{
					bgcolor: 'background.paper',
					width: isMobile ? '100%' : '90%',
					height: isMobile ? '100%' : '90%',
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
				<Results job={selectedJob} />
			</Box>
		</Modal>
	)
}

export default Details
