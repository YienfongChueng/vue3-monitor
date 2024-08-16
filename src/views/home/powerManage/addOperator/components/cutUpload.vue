<template>
    <div class="upload-item">
        <h1>base文件上传</h1>
        <div class="upload-wrap flex">
            <div class="btn-wrap flex">
                <input type="file"  @change="uploadChange"/>
                <div class="cut-btn" @click="hanleCut">生成裁剪图片</div>
            </div>
            <div class="img-wrap flex">
                <div>
                    <img ref="previewImgRef" :src="imgPreview" alt class="preview" />
                </div>
                <div>
                    <img :src="imgCutResult" alt class="cut-preview" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
let imgPreview = ref('')
let imgCutResult = ref('')
const previewImgRef = ref()

function uploadChange(e) {
    const reader = new FileReader()
    reader.onload = function(e) {
        // 本地预览
        imgPreview.value = e.target.result
    }
    reader.readAsDataURL(e.target.files[0])
}

function hanleCut(){
    const cutInfo = {
        x: 0, // 原图x坐标
        y: 0, // 原图y坐标
        cutWidth: 200,
        cutHeight: 200,
        width: 100,
        height: 100
    }
    const cvs = document.createElement('canvas')
    cvs.width = cutInfo.width
    cvs.height = cutInfo.height
    const ctx = cvs.getContext('2d')
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    // sx/sy 开始剪切的 x/y 坐标位置。
    // swidth/sheight 被剪切图像的宽度/高度。
    // x/y 在画布上放置图像的 x/y 坐标位置。
    // width/height 要使用的图像的宽度/高度。（伸展或缩小图像）
    ctx.drawImage(previewImgRef.value,cutInfo.x,cutInfo.y,cutInfo.cutWidth,cutInfo.cutHeight,0,0,cutInfo.width,cutInfo.height)
    cvs.toBlob(blob => {
        const file = new File([blob],'avater.jpg',{
            type: 'image/jpeg'
        })
        const reader = new FileReader()
        reader.onload = function(e) {
            // 截图后本地预览
            imgCutResult.value = e.target.result
        }
        reader.readAsDataURL(file)
        // 上传服务器逻辑
        // todo
    },'image/jpeg')


}

</script>

<style lang="scss" scoped>
.upload-item {
    background: #eee;
    border-radius: 8px;
    padding: 10px;
    grid-column-start:1;
    grid-column-end: 3;
}
.flex {
  display: flex;
}
.upload-wrap {
    padding:10px;
    flex-direction: column;
}
.btn-wrap {}
.img-wrap {
    width: 565px;
    height: 150px;
    margin: 10px 0;
    .preview {
        width: 350px;
        height:100%;
        object-fit: contain;
    }
    .cut-preview {
        width: 150px;
        height: 150px;
        margin-left: 20px;
    }
}

.cut-btn {
    cursor: pointer;
    text-align:center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.cut-btn:hover {
    color: #11145C;
    border-color: #11145C;
}

</style>