import { BaseText, CustomLink, Heading } from '@/shared/ui'
import s from './auth-message.module.scss'

interface AuthMessageProps {
	title?: string
	text?: string
}

export const AuthMessage = ({ title, text }: AuthMessageProps) => {
	return (
		<div className={s.messageWrapper}>
			<Heading variant='h1'>{title}</Heading>
			{text && <BaseText>{text}</BaseText>}
			<CustomLink href={'/'}>Return to Home Page</CustomLink>
		</div>
	)
}
