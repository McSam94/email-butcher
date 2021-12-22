import { List, ListItemText, ListItem, Box, Typography } from '@mui/material'
import * as React from 'react'
import ContentHeader from '@/components/content-header'
import dayjs from 'dayjs'
import Config from '@/constants/config'
import Files from '@/components/schdule/files'

const Results = ({ name, results }) => {
	return (
		<>
			<ContentHeader title={`${name}'s results`} />
			<List>
				{!results.length && <ListItemText>No result yet</ListItemText>}
				{results.map((result, index) => (
					<ListItem
						key={index}
						sx={{
							borderBottom: 1,
							borderColor: 'grey.400',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
						}}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
							<ListItemText>
								<Typography variant="subtitle1" noWrap>
									{result.emailTitle}
								</Typography>
							</ListItemText>
							<ListItemText>
								{dayjs(result.createdAt).format(Config.DATE_FORMAT)}
							</ListItemText>
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'row', ml: 4, flex: 6 }}>
							<Files files={result.files} />
						</Box>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default React.memo(Results)
