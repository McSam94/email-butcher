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
						key={`${toast.message}_${index}`}
						open={!!toast}
						autoHideDuration={4000}
						onClose={() => closeToast(index)}
						sx={{ bottom: 0 + index * 10 }}
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
