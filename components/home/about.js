import useResponsive from '@/hooks/useResponsive'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'

const About = () => {
	const { isMobile } = useResponsive()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				px: isMobile ? 0 : 12,
				maxWidth: 1200,
				alignSelf: 'center',
			}}
		>
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
				description="Tell us the bank's email address that sent you the statement and a name of directory you wanted to create in your Google Drive"
			/>
			<CaptionRow
				revert
				image="schedule"
				title="Scheduling"
				description="Scheduling feature are available and free up to 5 tasks. Save your time doing it over and over again"
			/>
			<CaptionRow
				image="upload"
				title="Upload to Google Drive"
				description="Give us a folder name to put your downloaded statements, we will upload extracted attachments in to your Google Drive."
			/>
		</Box>
	)
}

const CaptionRow = ({ image, title, description, revert }) => {
	const { isMobile } = useResponsive()
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				justifyContent: 'space-between',
				my: 4,
			}}
		>
			{(!revert || isMobile) && (
				<Image
					src={`/images/${image}.svg`}
					width={220}
					height={220}
					alt="extract"
				/>
			)}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: revert && !isMobile ? 'flex-end' : 'flex-start',
					textAlign: revert && !isMobile ? 'right' : 'left',
					mt: isMobile ? 6 : 0,
					maxWidth: isMobile ? '100%' : '60%',
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					{title}
				</Typography>
				<Typography variant="subtitle1" color="grey.600">
					{description}
				</Typography>
			</Box>
			{revert && !isMobile && (
				<Image
					src={`/images/${image}.svg`}
					width={220}
					height={220}
					alt="extract"
				/>
			)}
		</Box>
	)
}

export default About
