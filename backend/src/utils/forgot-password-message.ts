/* eslint-disable prettier/prettier */
import { User } from 'src/user/user.schema';

export const forgotPasswordMessage = (user: User & { _id?: string }, token: string): string => {
    return `
        Olá ${user.name.split(' ')[0]},\n\n
        Você recebeu este e-mail porque foi solicitada a alteração de senha da sua conta.
        Para prosseguir e alterar a senha basta acessar o seguinte link:\n\n
        ${process.env.CLIENT_HOST}/reset-password?token=${token}&id=${user._id}\n\n
        Caso você não tenha solicitado a alteração de senha, apenas ignore este e-mail e sua senha permanecerá inalterada.
    `
}