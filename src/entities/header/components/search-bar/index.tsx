'use client'
import SearchIcon from '@/assets/svg/search_icon.svg'

import s from './search-bar.module.scss'

export const SearchBar = () => {
	return (
		<div className={s.barWrapper}>
			<input />
			<div className={s.icon}>
				<span />
				<SearchIcon />
			</div>
		</div>
	)
}
