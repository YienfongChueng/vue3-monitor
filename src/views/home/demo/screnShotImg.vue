<template>
    <div class="file-wrap p-10">
        <input type="file" accept="image/*" @change="handleFileChange" />
    </div>
    <canvas ref="canvas1" class="canvas-box p-10"></canvas>
    
    <el-button type="primary" @click="handleDownLoad">下载</el-button>
    
    <canvas ref="canvas2" class="canvas2-box p-10"></canvas>
</template>

<script setup>
import { ref,onMounted,onBeforeUnmount,nextTick } from 'vue'

const canvas1 = ref()
const canvas2 = ref()

// 创建上下文
let  ctx;
let  ctx2;
let currentPoint = {}
onMounted(() => {
    // 创建上下文
    ctx = canvas1.value.getContext("2d")
    ctx2 = canvas2.value.getContext("2d")
    // 注册事件用于得到鼠标按下时的偏移量
    canvas1.value.addEventListener("mousedown", (e)=> {
        // // 鼠标按下
        currentPoint= { x: e.offsetX, y: e.offsetY }
        // 按下鼠标的时候我们需要注册移动事件和抬起事件
        canvas1.value.addEventListener('mousemove', mouseMoveInCanvasHandler)
        canvas1.value.addEventListener('mouseup', mouseUpInCanvasHandler)
    })
})
    
    // 图像源
    let img = new Image();
    let fileType = "" // 文件的类型,下载的时候需要
    // 上传文件change事件
    function handleFileChange(e) {
        let file = e.target.files[0]
        // 得到图片的类型，等会下载的时候需要
        console.log('file.type', file.type)
        fileType = file.type
        getImageWH(file, function(width, height) {  
            // 将宽度和高度传给canvasSetWH函数，显示在页面上
            canvasSetWH(canvas1.value,width, height)
            // 描边todo
            
            ctx.drawImage(img, 0, 0,width, height );
            // 调用绘制蒙层的方法
            //   drawMask(0,0,width, height);
        });
    }
    
    // 返回文件(图片的宽和高)
    function getImageWH(file, callback) {  
        // 创建一个FileReader实例  
        const reader = new FileReader();  
        // 当文件读取完成时触发  
        reader.onload = function(e) {  
            // e 这个对象中包含这个图片相关的属性
            console.log('e这个对象', e)
            
            // 设置Image的src为读取到的文件内容  
            img.src = e.target.result;  
            // 当图片加载时触发  
            img.onload = function() {  
            // 调用回调函数，返回图像源，图片的宽度，高度
            callback(img.width, img.height);  
            };
        };
        // 开始读取文件内容，以DataURL的形式 
        // reader.onload 方法的执行需要调用下面这个 reader.readAsDataURL
        reader.readAsDataURL(file);  
    } 
    // 设置canvas的宽高和style
    function canvasSetWH(canvasNode,width, height){
        canvasNode.width = width
        canvasNode.height = height
        canvasNode.style.display = "block"
    }
    // 绘制蒙层
    function drawMask(x, y, width, height, opactity) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(x, y, width, height);
    }
    
    
    
    
    // 截图区域的数据
    let screenshotData = []
    // 鼠标移动绘制矩形
    function mouseMoveInCanvasHandler(e){
        let rectEndX = e.offsetX
        let rectEndY = e.offsetY
        // 得到矩形的宽度和高度
        let rectWidth = rectEndX - currentPoint.x
        let rectHeight = rectEndY - currentPoint.y
        let {width, height} = canvas1.value
        // 将截图区域的数据保存下来
        screenshotData = [currentPoint.x, currentPoint.y, rectWidth, rectHeight]
        ctx.clearRect(0, 0, width, height)
        // 绘制蒙层
        drawMask(0,0,width, height);
        drawScreenShot(width, height,rectWidth, rectHeight)
    }
    
    // 绘制截图
    function drawScreenShot( canvasWidth, canvasHeight, rectWidth, rectHeight){
        // 在原图形之外画出一个矩形；。
        ctx.globalCompositeOperation = "destination-out"; // 仅保留现有画布内容和新形状不重叠的部分。
        ctx.fillStyle='#000' 
        ctx.fillRect(currentPoint.x, currentPoint.y,rectWidth,rectHeight)
        ctx.globalCompositeOperation ='destination-over' //在现有画布内容的后面绘制新的图形。
        // 绘制截图区域的矩形 drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(img, 0, 0,canvasWidth, canvasHeight,0,0,canvasWidth, canvasHeight );
    }
    
    // 鼠标抬起的时候要移除移动事件和抬起事件
    function mouseUpInCanvasHandler(e){
        canvas1.value.removeEventListener('mousemove', mouseMoveInCanvasHandler)
        canvas1.value.removeEventListener('mouseup', mouseUpInCanvasHandler)
        drawScreenShotImg(screenshotData)
    }
    
     // 绘制一个截图区域的信息在另外一个画布上，并且将他显示出来
    function drawScreenShotImg(screenshotData){
        // screenshotData是截图的开始和结束坐标
        let drawData = ctx.getImageData(...screenshotData)
        canvasSetWH(canvas2.value,screenshotData[2],screenshotData[3])
        // 先清空画布，注意清空的大小，否者会造成叠加（清除不干净）
        ctx2.clearRect(0,0, currentPoint.x, currentPoint.y)
        // 将截图区域绘制到canvas2上
        ctx2.putImageData(drawData,0,0)
    }
    
    // 下载
    function handleDownLoad(){
        // format:表示的是图片的类型  "image/png"
        // toDataURL的第一个参数：图片格式，默认为 image/png,
        // 第2个参数：可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
        let imgURL = canvas2.value.toDataURL( fileType, 1);
        let link = document.createElement('a');
        link.download = "截图图片";
        link.href = imgURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

</script>

<style lang="scss" scoped>
* {
    color: #fff;
}
.p-10 {
    padding: 10px;
}
.file-wrap {
    padding: 30px 0;
}
    .canvas-box,.canvas2-box{
      display: none;
    }
</style>