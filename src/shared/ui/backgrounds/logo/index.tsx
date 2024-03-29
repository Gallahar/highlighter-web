import { ComponentPropsWithoutRef } from 'react'
import LogoComponent from '@/assets/svg/logo.svg'

export const Logo = (props: ComponentPropsWithoutRef<'svg'>) => {
	return <LogoComponent {...props} />
}
