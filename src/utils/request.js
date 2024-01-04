import axios from 'axios'
import useToken from '@/utils/auth'

const request = axios.create({
    // baseURL: 'http://49.235.128.49:5059/api',
    // baseURL: 'http://106.75.241.100:5059/api',
    baseURL: 'http://124.223.161.17:5059/api',
    timeout:2000
})

request.interceptors.request.use(config => {
    config.headers['token'] = useToken().getToken()
    return config
})

request.interceptors.response.use(res => {
    console.log("响应拦截res：",res)
    //错误码的处理
    let {code,msg} = res.data;
    if(code !==20000){
        ElMessage({
            message: msg ||'服务器出错啦～.',
            type: 'error',
            duration:1000
        })
    }
    return res
},error => {
    return Promise.reject(error)
})

export default request