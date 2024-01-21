import { AddVideoButton, SearchBar } from '@/entities/header'
import s from './header.module.scss'
import { UserBar } from '@/entities/header/components/user-bar'
import { Divider } from '@/shared/ui'

export const Header = () => {
	return (
		<header className={s.headerWrapper}>
			<div className={s.inner}>
				<AddVideoButton />
				<SearchBar />
				<UserBar />
			</div>
			<Divider  />
		</header>
	)
}
