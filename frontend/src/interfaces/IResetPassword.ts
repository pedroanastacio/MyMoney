export interface IResetPassword {
    user_id: string
    forgot_password_token: string
    password: string
}