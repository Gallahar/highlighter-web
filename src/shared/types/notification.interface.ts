enum TypeNotification {
	SUCCESS = 'Success',
	FAILURE = 'Failure',
}

export interface Notification {
	type: TypeNotification
	message: string
	isRead: boolean
    
}
