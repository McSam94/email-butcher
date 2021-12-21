import * as React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useUiStore } from '@/store/ui'

const Toast = () => {
	const { toasts, closeToast } = useUiStore()

	return (
		<>
			{toasts.length > 0 &&
				toasts.map((toast, index) => (
					<Snackbar
						key={index}
						open={!!toast}
						autoHideDuration={4000}
						onClose={() => closeToast(index)}
					>
						<Alert
							onClose={() => closeToast(index)}
							severity={toast?.type ?? 'info'}
							sx={{ width: '100%' }}
						>
							{toast.message ?? 'Unknown'}
						</Alert>
					</Snackbar>
				))}
		</>
	)
}

export default React.memo(Toast)
