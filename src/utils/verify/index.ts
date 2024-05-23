export default {
  commonVerify(verify: any, ctx: any): boolean {
    const keys = Object.keys(verify)
    let flag = true
    keys.map(item => {
      const nowVal = ctx[item] || null
      if (!nowVal) {
        //  如果目标不存在
        if ((verify[item].allowNull || false) == false) {
          if (nowVal == null) {
            flag = false
          } else {
          }
        } else {
          //  如果不允许不存在,报错
          flag = false
        }
      }
    })
    return flag
  }
}