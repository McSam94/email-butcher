import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'

const HowItWorks = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', px: 12 }}>
			<Typography
				variant="h4"
				color="secondary"
				fontWeight="bold"
				sx={{ mb: 4 }}
			>
				Meet Email Butcher
			</Typography>
			<Typography
				variant="subtitle1"
				color="secondary"
				textAlign="left"
				sx={{ mb: 1 }}
			>
				Need to collect all the pdf statement your bank sent you every month? We
				are here to help!
			</Typography>
			<Typography
				variant="subtitle1"
				color="secondary"
				textAlign="left"
				sx={{ mb: 2 }}
			>
				Click run and we will search through your email to download all the
				statements for you! This works for any attachments, not just bank
				statements!
			</Typography>
			<CaptionRow
				image="extract"
				title="Easy & Simple"
				description="Tell us the bank's email address that sent you the statement and a name of directory you wanted to create in your google drive"
			/>
			<CaptionRow
				revert
				image="schedule"
				title="Schedule"
				description="Scheduling feature are available and free up to 5 tasks. Save your time doing it over and over again"
			/>
			<CaptionRow
				image="upload"
				title="Upload to Google Drive"
				description="Give us a folder name to put your downloaded statements, we will upload extracted attachments in to your Google drive."
			/>
		</Box>
	)
}

const CaptionRow = ({ image, title, description, revert }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				my: 4,
			}}
		>
			{!revert && (
				<Image
					src={`/images/${image}.svg`}
					width={240}
					height={240}
					alt="extract"
				/>
			)}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: revert ? 'flex-end' : 'flex-start',
					textAlign: revert ? 'right' : 'left',
					maxWidth: '60%',
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					{title}
				</Typography>
				<Typography variant="subtitle1" color="grey.600">
					{description}
				</Typography>
			</Box>
			{revert && (
				<Image
					src={`/images/${image}.svg`}
					width={240}
					height={240}
					alt="extract"
				/>
			)}
		</Box>
	)
}

export default HowItWorks
