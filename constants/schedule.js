import dayjs from 'dayjs'

export const COLUMNS = [
	{
		field: 'id',
		headerName: 'ID',
		width: 300,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 300,
	},
	{
		field: 'storagePath',
		headerName: 'Drive',
		width: 320,
	},
	{
		field: 'mailQuery',
		headerName: 'Sender Mail',
		width: 240,
		valueGetter: param => param.value?.split(',')[0].substring(5),
	},
	{
		field: 'updatedAt',
		headerName: 'Last Run',
		width: 200,
		valueGetter: param => dayjs(param.value).format('MMM, DD YYYY hh:mm A'),
	},
	{
		field: 'jobResults',
		headerName: 'Results',
		valueFormatter: param => param.value.length,
		valueParser: param => param.value,
	},
]
