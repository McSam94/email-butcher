import MENU from '@/constants/menu'
import HomeIcon from '@mui/icons-material/Home'
import SettingIcon from '@mui/icons-material/Settings'

export const getMenuIcon = menu => {
	switch (menu) {
		case MENU.HOME.label: {
			return <HomeIcon />
		}
		case MENU.SETTINGS.label: {
			return <SettingIcon />
		}
	}
}
