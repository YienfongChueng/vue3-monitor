import { computed } from "vue"

export const useWaterMaker = (props) => {
    // 它是一个计算属性，意味着它的值会根据其依赖的 props 的变化而自动重新计算
    return computed(() => {
        // 创建一个新的 canvas 元素
        const can = document.createElement('canvas')
        // 获取设备的像素比，如果未定义则默认为1
        const devicePixelRatio = window.devicePixelRatio || 1
        // 根据像素比计算字体大小
        const fontSize = props.fontSize * devicePixelRatio
        // 设置字体样式
        const font = fontSize + 'px serif'

        // 获取 canvas 的 2D 渲染上下文
        const ctx = can.getContext('2d')
        ctx.font = font // 设置字体
        // 测量文本的宽度
        const {width} = ctx.measureText(props.text)
        console.log("width:",width)
        // 计算 canvas 的大小，至少为 60，并根据文本宽度和间距因子进行调整
        const canvasSize = (Math.max(60,width) + props.gap)* devicePixelRatio
        console.log("canvasSize:",canvasSize)
        // 设置 canvas 的宽高
        can.width = canvasSize;
        can.height = canvasSize;
        // 将 canvas 的原点移动到中心
        ctx.translate(can.width/2,can.height/2)
        //  旋转 canvas 45 度 1度=Math.PI/180
        ctx.rotate((Math.PI/180)*-45)
        // 设置填充颜色
        ctx.fillStyle = props.color
        // 设置文本对齐方式和基线
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        // 再次设置字体
        ctx.font =font
        // 在 canvas 上填充文本
        ctx.fillText(props.text,0,0)

        // 返回一个对象，包含 base64 编码的图片数据、canvas 的大小和样式尺寸
        return {
            base64: can.toDataURL(),
            size: canvasSize,
            styleSize: canvasSize / devicePixelRatio
        }
    })
}