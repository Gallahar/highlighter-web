import s from './divider.module.scss'
import { ccn } from '@/shared/lib/utils/client/cсn'
import { ComponentPropsWithoutRef } from 'react'

export const Divider = ({
	className,
	...rest
}: ComponentPropsWithoutRef<'div'>) => {
	return <div className={ccn(s.divider, className)} {...rest} />
}
