import { Card, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import Config from '@/constants/config'

const Files = ({ files }) => {
	const filesToShows = React.useMemo(
		() =>
			files.length > Config.SCHEDULE.FILES_COUNT
				? files.slice(0, Config.SCHEDULE.FILES_COUNT)
				: files,
		[files]
	)

	const onFileClick = React.useCallback(fileUrl => {
		window.open(fileUrl)
	}, [])

	return (
		<>
			{filesToShows.map((file, index) => (
				<Card
					key={index}
					sx={{ height: 60, width: 120, ml: 2, cursor: 'pointer' }}
					onClick={() => onFileClick(file.storagePath)}
					variant="outlined"
				>
					<CardContent>
						<Typography noWrap>{file.fileName}</Typography>
					</CardContent>
				</Card>
			))}
			{files.length > 5 && (
				<Card sx={{ height: 60, width: 120, ml: 2 }} variant="outlined">
					<CardContent>
						<Typography noWrap>+ {files.length - 5}</Typography>
					</CardContent>
				</Card>
			)}
		</>
	)
}

export default React.memo(Files)
