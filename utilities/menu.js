import MENU from '@/constants/menu'
import HomeIcon from '@mui/icons-material/Home'
import SettingIcon from '@mui/icons-material/Settings'
import ScheduleIcon from '@mui/icons-material/Work'
import DummyIcon from '@mui/icons-material/Abc'

export const getMenuIcon = menu => {
	switch (menu) {
		case MENU.HOME.label:
			return <HomeIcon />
		case MENU.SETTINGS.label:
			return <SettingIcon />
		case MENU.SCHEDULE.label:
			return <ScheduleIcon />
		default:
			return <DummyIcon />
	}
}
