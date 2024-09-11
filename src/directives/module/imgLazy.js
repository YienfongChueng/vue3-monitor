
import { useIntersectionObserver } from '@vueuse/core'

export default {
    mounted(el,binding) {
        ////// 不实用usevue写法
        // const intersectionObserver = new IntersectionObserver(entries => {
        //     entries.map(item => {
        //         if(item.isIntersecting) {
        //             el.src = binding.value
        //             intersectionObserver.unobserve(el);
        //         }
        //     })
        // })
        // intersectionObserver.observe(el)
        
        ////// 使用vueuse写法
        const {stop} = useIntersectionObserver(el,
            ([{ isIntersecting }]) => {  // isIntersecting 监听是否进入视口区域
                if(isIntersecting) {
                    // 进入视口
                    el.src = binding.value
                    // 要停止，否则浪费内存   
                    stop() // 第一次加载完图片后就停止监听
                }
          })
    },
}