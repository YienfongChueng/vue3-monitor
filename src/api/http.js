import request from '@/utils/request.js'

export default {
    get:(url,params) => request.get(url,{params}),
    post:(url,data) => request.post(url,data),
    put: (url,data) => request.put(url,data),
    delete: (url,data) => request.delete(url,data),
    upload: (url,file) => request.post(url,file,{
        headers:{'Content-Type':'multipart/form-data'}
    })
}