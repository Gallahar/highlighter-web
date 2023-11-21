import { RegisterForm } from '@/features/auth/forms'
import { Heading } from '@/shared/ui/typography/Heading'
import s from './register.module.scss'
import { CustomLink } from '@/shared/ui/links/CustomLink'
import { BaseText } from '@/shared/ui/typography/BaseText'

export default async function Register() {
	return (
		<section className={s.register}>
			<Heading variant='h1'>create your account</Heading>
			<RegisterForm />
			<BaseText isItalic>
				Already have an Account?{' '}
				<CustomLink isAccent href={'/login'}>
					Login here
				</CustomLink>
			</BaseText>
		</section>
	)
}
