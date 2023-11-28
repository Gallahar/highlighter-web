'use client'

import { LinkWithIcon } from '@/shared/ui/links/link-with-icon'
import { navigationData } from '../../config/navigation-data'
import s from './nav-list.module.scss'
import { ComponentPropsWithoutRef } from 'react'
import { ccn } from '@/shared/lib'
import { usePathname } from 'next/navigation'

export const NavList = ({
	className,
	...rest
}: ComponentPropsWithoutRef<'nav'>) => {
	const pathname = usePathname()

	return (
		<nav className={ccn(s.navigation, className)} {...rest}>
			<ul>
				{navigationData.map(({ title, icon, href }, i) => (
					<li data-active={pathname.includes(href)} key={title}>
						<LinkWithIcon href={href} icon={icon} notificationCount={i}>
							{title}
						</LinkWithIcon>
					</li>
				))}
			</ul>
		</nav>
	)
}
