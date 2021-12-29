import MENU from '@/constants/menu'
// import SettingIcon from '@mui/icons-material/Settings'
import ScheduleIcon from '@mui/icons-material/Timelapse'
import DummyIcon from '@mui/icons-material/Abc'

export const getMenuIcon = menu => {
	switch (menu) {
		// case MENU.SETTINGS.label:
		// 	return <SettingIcon />
		case MENU.SCHEDULE.label:
			return <ScheduleIcon />
		default:
			return <DummyIcon />
	}
}
