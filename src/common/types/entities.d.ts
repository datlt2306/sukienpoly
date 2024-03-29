import { FeedbackStatus, JoinEventStatus, UserRoleEnum } from '../constants/enums'

export interface BaseEntityInterface {
   id: number
   created_at: Date
   updated_at: Date
}

export interface UserInterface extends BaseEntityInterface {
   name: string
   password?: string
   email: string
   student_code?: string
   avatar?: string
   phone: string
   role: UserRoleEnum
}

export interface EventInterface extends BaseEntityInterface {
   name: string
   attendances_count: number
   banner: string
   contact: string
   location: string
   start_time: Date | string
   end_time: Date | string
   description: string
   content: string
   status: any
   status_join: JoinEventStatus
   status_feedBack_join: FeedbackStatus
   user_id: number
   area_id: number
   area?: AreaInterface
   user?: Partial<UserInterface>
   feedback?: FeedbackInterface[]
   attendances: Partial<UserInterface & { status_feedback: FeedbackStatus }>[]
}

export interface StatisticsInterface {
   eventInLastMonth: number
   eventInCurrentMonth: number
   percentInEvent: number
   joinEventInCurrentMonth: number
   joinEventInLastMonth: number
   percentInJoinEvent: number
   userInRoleStaff: number
   feedBackInCurrentMonth: number
   feedBackInLastMonth: number
   percentInFeedBack: number
}

export interface FeedbackInterface extends BaseEntityInterface {
   id: number
   rating: number
   recommend: string | null
   content: string
   user_id: number
   event_id: number
   created_at: Date
   updated_at: Date
   user: Partial<UserInterface>
   created_at: Date
   updated_at: Date
   read?: boolean
}

export interface NotificationInterface extends BaseEntityInterface {
   title: string
   content: string
   event_id: number
   user_id: number
   event: Partial<EventInterface>
   time_send: string | Date
   create_by: Partial<UserInterface>
   deleted_at: Date | null
   sent_at: Date | string | null
   user_join: Partial<UserInterface>[]
}

export interface AreaInterface extends BaseEntityInterface {
   name: string
   address: string
}
