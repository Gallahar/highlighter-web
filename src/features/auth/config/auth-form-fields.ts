import { emailRegexp } from '@/shared/config'

const emailFields = {
	id: 'email',
	label: 'e-mail',
	type: 'email',
}

const passwordFields = {
	id: 'password',
	label: 'password',
	type: 'password',
}

const usernameFields = {
	id: 'username',
	label: 'username',
	type: 'text',
}

const emailValidation = {
	required: 'Email is required',
	pattern: {
		value: emailRegexp,
		message: 'Incorrect format of email',
	},
}

const passwordValidation = {
	required: 'Password is required',
	minLength: {
		value: 8,
		message: 'Password must be at least 8 length',
	},
	maxLength: {
		value: 24,
		message: 'Password should no more then 24 length',
	},
}

const usernameValidation = {
	required: 'Name is required',
	minLength: {
		value: 4,
		message: 'Name should be at least 4th length ',
	},
}

export {
	emailFields,
	passwordFields,
	usernameFields,
	emailValidation,
	passwordValidation,
	usernameValidation,
}
