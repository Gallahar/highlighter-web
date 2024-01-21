import IconHeadphones from '@/assets/svg/headphons_icon.svg'
import CategoriesIcon from '@/assets/svg/categories_icon.svg'
import MessageIcon from '@/assets/svg/message_icon.svg'
import HeartIcon from '@/assets/svg/heart_icon.svg'
import RingIcon from '@/assets/svg/ring_icon.svg'
import SettingIcon from '@/assets/svg/settings_icon.svg'

export const navigationData = [
	{ title: 'games', href: '/games', icon: <IconHeadphones /> },
	{ title: 'categories', href: '/categories', icon: <CategoriesIcon /> },
	{ title: 'liked highlights', href: '/liked', icon: <MessageIcon /> },
	{ title: 'history', href: '/history', icon: <HeartIcon /> },
	{ title: 'followed', href: '/followed', icon: <RingIcon /> },
	{ title: 'settings', href: '/settings', icon: <SettingIcon /> },
]
