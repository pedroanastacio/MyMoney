/* eslint-disable prettier/prettier */
export const resetPasswordMessage = (username: string): string => {
    return `
        Olá ${username.split(' ')[0]},\n\n
        A sua senha foi alterada com sucesso. Agora basta entrar com a sua nova senha.
    `
}