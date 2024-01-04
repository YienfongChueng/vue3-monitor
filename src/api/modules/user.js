import http from '../http'

const prefix = '/user'

//登陆
export const apiLogin = (data) => {
    return http.post(`${prefix}/login`,data)
}

// 获取用户信息
export const apiUserInfo = () => {
    return http.get(`${prefix}/info`)
}

// 登出
export const apiLogout = () => {
    return http.post(`${prefix}/logout`)
}

// 权限管理-添加操作员
export const createUser = (data) => {
    return http.post(`${prefix}/createUser`,data)
}

// 权限管理-操作员列表
export const userList = (data) => {
    return http.get(`${prefix}/list`,data)
}

// 权限管理-删除操作员
export const removeUser = (id) => {
    return http.delete(`${prefix}/removeUser/${id}`)
}

// 权限管理-查找所有目录
export const findModules = (data) => {
    return http.get('/permission/findModules',data)
}

// 权限管理-获取所有操作员
export const getUserOper = (data) => {
    return http.get(`${prefix}/opers`,data)
}

// 权限管理-操作员权限-通过操作员查看菜单目录
export const findModulesByUid = (data) => {
    return http.get('/permission/findModulesByUid',data)
}

// 权限管理-操作员权限-修改权限
export const updateModulesPermByUid = (data) => {
    http.post('/permission/updateModulesPermByUid',data)
}
