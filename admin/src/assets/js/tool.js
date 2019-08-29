/**
 *
 * @param {*} routers 所有路由
 * @param {*} access  用户权限
 */
export const getMenuByRouter = (routers, access) => {
  let res = []

  routers.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      // 如果是点击跳转外链的话 就是 外链
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access)
      ) {
        obj.children = getMenuByRouter(item.children, access)
      }

      if (showThisMenuEle(item, access)) {
        //有子集且  有权限的 子集长度大于0时
        if (hasChild(item) && obj.children.length > 0) {
          res.push(obj)
        } else if (!hasChild(item)) {
          res.push(obj)
        }
      }
    }
  })
  return res
}

/**
 *
 * @param {*} item 判断是否有子级
 */
export const hasChild = item => {
  return item.children && item.children.length !== 0
}

/**
 *
 * @param {*} item
 * @param {*} access
 */
const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access) {
    // console.log(item.meta.access, access)
    if (hasOneOf(item.meta.access, access)) {
      return true
    } else return false
  } else {
    return true
  }
}

/**
 * @param {String} target 目标数组
 * @param {Array} arr 需要查询的值
 * @description 判断要查询的值是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  return arr.indexOf(target) > -1 ? true : false
}
