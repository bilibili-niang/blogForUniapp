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

/*

    "id": 26,
    "username": "微信用户0.6254502292898061",
    "email": "null",
    "is_admin": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW-ruS_oeeUqOaItzAuNjI1NDUwMjI5Mjg5ODA2MSIsImVtYWlsIjoibnVsbCIsImF2YXRhciI6Ii9pbWFnZXMvYXZhdGFycy9kZWZhdWx0QXZhdGFyLnBuZyIsImlhdCI6MTY5NTc0ODg3MSwiZXhwIjoxNjk2MTA4ODcxfQ.TE7skhGh3s79uUedpGu-dcTM-gwRBipCaWrbI9VIQjA",
    "avatar": "/images/avatars/defaultAvatar.png",
    "occupation": "coder",
    "githubUrl": "null",
    "word": null,
    "showInIndex": null,
    "openid": "o6WgI5HYxWF66F0YlI5QzP89GMK8",
    "createdAt": "2023-09-26T17:21:11.000Z"
* */
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

/*
"id": 26,
      "username": "微信用户0.6254502292898061",
      "email": "null",
      "realPassword": "123456",
      "is_admin": 0,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW-ruS_oeeUqOaItzAuNjI1NDUwMjI5Mjg5ODA2MSIsImVtYWlsIjoibnVsbCIsImF2YXRhciI6Ii9pbWFnZXMvYXZhdGFycy9kZWZhdWx0QXZhdGFyLnBuZyIsImlhdCI6MTY5NTc0ODg3MSwiZXhwIjoxNjk2MTA4ODcxfQ.TE7skhGh3s79uUedpGu-dcTM-gwRBipCaWrbI9VIQjA",
      "avatar": "/images/avatars/defaultAvatar.png",
      "occupation": "coder",
      "githubUrl": "null",
      "word": null,
      "showInIndex": null,
      "openid": "o6WgI5HYxWF66F0YlI5QzP89GMK8",
      "createdAt": "2023-09-26T17:21:11.000Z"
* */
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