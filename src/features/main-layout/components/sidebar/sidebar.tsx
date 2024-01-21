import s from './sidebar.module.scss'
import { Divider, Logo } from '@/shared/ui'
import { LogoutButton, NavList } from '@/entities/navigation'
import { ComponentPropsWithoutRef } from 'react'
import { ccn } from '@/shared/lib'

export const Sidebar = ({ className }: ComponentPropsWithoutRef<'aside'>) => {
	return (
		<aside className={ccn(s.sidebar, className)}>
			<Logo />
			<Divider className={s.divider1} />
			<div className={s.actionBlock}>
				<NavList />
				<LogoutButton />
			</div>
			<Divider className={s.divider2} />
			<small className={s.copyright}>2023 © All rights reserved</small>
		</aside>
	)
}
