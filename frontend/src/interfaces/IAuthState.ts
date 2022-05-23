import { IUser } from './IUser'

export interface IAuthState {
    refreshToken: string | null
    accessToken: string | null
    user: IUser | null
    authenticating: boolean
}