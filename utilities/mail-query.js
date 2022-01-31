export const generateMailQuery = ({ from, to, cc, bcc, subject, label }) =>
	`from:${from}@gmail.com${to ? `,to:${to}@gmail.com` : ''}${
		cc ? `,cc:${cc}` : ''
	}${bcc ? `,to:${bcc}` : ''}${subject ? `,to:${subject}` : ''}${
		label ? `,to:${label}` : ''
	},has:attachment`
