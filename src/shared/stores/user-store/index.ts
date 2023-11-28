// import { authApi } from '@/shared/api'
// import { LoginDto, RegisterDto, User } from '@/shared/types/user.interface'
// import { create } from 'zustand'

// interface UserState {
// 	user: User | null
// 	registerUser: (userDto: RegisterDto) => Promise<void>
// 	// loginUser: (userDto: LoginDto) => Promise<void>
// }

// export const useUserStore = create<UserState>()((set) => ({
// 	user: null,
// 	registerUser: async (dto) => {
// 		const response = await authApi.post('register', { json: dto }).json()
// 		console.log(response)
// 		set({ user: response as User })
// 	},
// }))
