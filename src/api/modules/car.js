import http from '../http'

const prefix = '/car'

// 车辆列表-查询所有
export const carList = (data) => {
    return http.get(`/car/list`,data)
}

// 车辆列表-添加OR编辑
export const carCreateOrUpd = (data) => {
    return http.post(`/car/createOrUpd`,data)
}

// 车辆列表-车牌校验
export const carIsExist = (data) => {
    return http.get(`/car/isExist`,data)
}

// 车辆列表-删除
export const carDelete = (id) => {
    return http.delete(`/car/delete/${id}`)
}

// 车辆监控-查看状态正常车牌号
export const carListValid = (data) => {
    return http.get(`/car/list/valid`,data)
}

// 车辆监控-通过车牌查询列表
export const carChargeList = (data) => {
    return http.get(`/charge/list`,data)
}

// 车辆电量监控-车辆充电-开始充电
export const carCharge = (data) => {
    return http.post(`/charge/charge`,data)
}

// 车辆电量监控-车辆维保
export const carChargeNum = (data) => {
    return http.get(`/charge/chargenum`,data)
}

// 车辆电量监控-车辆维保-查询是否提交工单 ???不知道的这个接口干啥用
export const orderCarList = (data) => {
    return http.get('/order/query/car',data)
}

// 车辆电量监控-车辆维保-提交工单
export const orderCreateOrUpd = (data) => {
    return http.post('/order/createOrupd',data)
}

// 车辆电量监控-工单管理-列表展示
export const orderList = (data) => {
    return http.get('/order/list',data)
}

// 车辆电量监控-工单管理-处理工单
export const orderComplete = (data) => {
    return http.post('/order/complete',data)
}

// 统计分析-车辆汇总
export const censusStatCar = (data) => {
    return http.get('/census/statCar',data)
}
