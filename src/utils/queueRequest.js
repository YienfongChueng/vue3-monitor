import axios from 'axios'

// reqs 请求总数
export const handQueue = reqs => {
    reqs = reqs || []
    const _MAX = 6 // 最大并发数

    const requestQueue = (maxReq) => {
        maxReq = maxReq || _MAX
        const queues = [] // 请求池
        let current = 0 // 当前请求index

        // 出队
        const dequeue = () => {
            while (current < maxReq && queues.length) {
                current++;
                const requestPromiseFactory = queues.shift() // 出列
                requestPromiseFactory().then(res => {
                    console.log('sucess res',res)
                }).catch(err => [
                    console.log('error',error)
                ]).finally(()=>{
                    current--;
                    dequeue()
                })
            }
        }
        // 入队
        const enqueue = (req) => {
            queues.push(req) // 入队
            dequeue()
        }
        return enqueue
    }

    const enqueue = requestQueue(2)
    for (let i = 0; i < reqs.length; i++) {
        enqueue(() => axios.get(reqs))
    }
}
