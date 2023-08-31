/** 通用的用户信息 */
type BaseProfile = {
    /** 用户ID */
    id: number
    /** 头像  */
    avatar: string
    /** 账户名  */
    account: string
}

/** 小程序登录 登录用户信息 */
// export type LoginResult = BaseProfile & {
/**
 * 目前后端只返回了这两个字段
 */
export type LoginResult = {
    /** 登录凭证 */
    Token: string
    /**
     * 用户名
     */
    Name: string
}

/** 个人信息 用户详情信息 */
export type ProfileDetail = BaseProfile & {
    /** 性别 */
    gender?: Gender
    /** 生日 */
    birthday?: string
    /** 省市区 */
    fullLocation?: string
    /** 职业 */
    profession?: string
}
/** 性别 */
export type Gender = '女' | '男'

/** 个人信息 修改请求体参数 */
/*export type ProfileParams = Pick<
    ProfileDetail,
    'Name' | 'gender' | 'birthday' | 'profession'
> & {
    /!** 省份编码 *!/
    provinceCode?: string
    /!** 城市编码 *!/
    cityCode?: string
    /!** 区/县编码 *!/
    countyCode?: string
}*/
