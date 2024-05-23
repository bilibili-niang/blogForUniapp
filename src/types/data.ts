/**
 * 请求响应定义
 */
export type Data<T> = {
    code: number
    msg: string
    message: string
    success: boolean
    result: userLoginInfo | tokenInfo
}

// 用户微信登陆返回的数据格式
export type userLoginInfo = {
    id: number
    username: string
    email: string
    is_admin: number
    token: string
    avatar: string
    occupation: string
    githubUrl: string
    word: string
    showInIndex: string
    openid: string
    createdAt: string
}

// 通过token获取用户数据格式
export type tokenInfo = {
    id: number
    username: string
    email: string
    realPassword: string
    is_admin: number
    token: string
    avatar: string
    occupation: string
    githubUrl: string
    word: string
    showInIndex: string
    openid: string
    createdAt: string
}