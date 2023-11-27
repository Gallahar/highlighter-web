'use client'

export const localStorageService = {
	getUserEmail: () => {
		return localStorage.getItem('email')
	},
	setUserEmail: (email: string) => {
		localStorage.setItem('email', email)
	},
	removeUserEmail: () => {
		localStorage.removeItem('email')
	},
}
