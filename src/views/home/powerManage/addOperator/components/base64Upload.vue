<template>
    <div :class="['upload-item',showArea]" >
        <h1>base文件上传</h1>
        <div class="upload">
            <div class="upload-common upload-select" @click="selectFile">
                <span>+</span>
                <input ref="inputRef" type="file" style="display:none;" @change="inputChange"/>
            </div>
            <div class="upload-common upload-progress">
                <div class="progress-bar">
                    <span class="progress-desc">{{progressValue === 100 ? '上传完成！' : '文件上传中...'}}</span>
                    <progress max="100" :value="progressValue"></progress>
                    <span class="progress-desc">{{progressValue}}%</span>
                    <span class="progress-desc cancel" @click="cancel">取消</span>
                </div>
            </div>
            <div class="upload-common upload-result">
                <button @click="cancel">X</button>
            </div>
            <img :src="img"  alt class="preview" />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { validateFile } from '../fileUtils.js'

const inputRef = ref()
let img = ref('')
let progressValue = ref(0) // 进度条的值
let showArea = ref('select') // 切换样式 select、progress、result

// 切换界面样式
function changeArea(type) {
    showArea.value = type
}
// 更改进度条数据
function changeProgress(value) {
    progressValue.value = value
}
// 触发文件上传点击事件
function selectFile(){
    inputRef.value.click()
}

// 取消上传
function cancel(){
    cancelUpload && cancelUpload()
    changeArea('select')
}

let reader = null
let cancelUpload = null
function inputChange(e){
    const file = e.target.files[0]
    // 文件验证不通过
    if(!validateFile(file)) {
        return;
    }
    // 文件验证通过之后
    // 1. 切换界面
    changeArea('progress')
    // 2. 读取图片,dataURL
    reader = new FileReader()
    reader.onload = (e) => {
        img.value = e.target.result
    }
    reader.readAsDataURL(file) 
    // 3. 上传处理
    cancelUpload = uploadBase64(file,onProgress,onFinish)
}
// 进度处理
function onProgress(val) {
    changeProgress(val)
}
// 上传成功处理
function onFinish(res) {
    ElNotification({
            type: 'success',
            title: '提示',
            message: '上传成功',
            duration: 1000,
    });
    changeArea('result')
}

// base64上传
function uploadBase64(file,onProgress,onFinish) {
    let xhr;
    const ext = '.' + file.name.split('.').pop()
    const reader = new FileReader()
    reader.onload = (e) => {
        const base64 = e.target.result.split(',').pop()
        // 上传
        xhr = new XMLHttpRequest()
        xhr.onload = function(){
            // 上传完成
            const resp = JSON.parse(xhr.reponseText)
            onFinish(resp)
        }
        xhr.upload.onprogress = function(e) {
            const percent = Math.floor(e.loaded / e.total * 100)
            onProgress(percent)
        }
        xhr.open('post','http://test.com:9527/upload/base64')
        xhr.setRequestHeader('content-type','application/json')
        xhr.send(JSON.stringify({
            ext,
            avater: base64
        }))
    }
    reader.readAsDataURL(file)  // 异步
    
    // 返回一个函数用于取消上传
    return function(){
        xhr && xhr.abort()
    }
}

</script>

<style lang="scss" scoped>
.cantainer {
    height: 100%;
    .title {
        color: #fff;
        padding-bottom: 10px;
    }
}
.upload-wrap {
    display:grid;
    grid-template-columns: repeat(4, 24%);
    grid-template-rows: 250px 250px;
    gap:10px;
}
.upload-item {
    background: #eee;
    border-radius: 8px;
    padding: 10px;
}
.upload {
    padding-top: 10px;
    position: relative;
    .upload-common {
        width: 100px;
        height: 100px;
        border: 2px solid #ccc;
        border-radius:4px;
        position: relative;
    }
    .upload-select {
        span {
            width:100%;
            display: inline-block;
            text-align: center;
            font-size:70px;
            color: #ccc;
            cursor:pointer;
        }
    }
    .upload-progress {
        display:none;
        .progress-bar {
            padding:10px;
            position: absolute;
            top:50%;
            transform:translateY(-50%);
            z-index:2;
            .progress-desc {
                width:100%;
                display:inline-block;
                text-align:center;
                font-size:12px;
                color:#918989;
            }
            .cancel {
                cursor: pointer;
            }
            progress {
                width:100%;
            }
        }
    }
    .upload-result {
        display:none;
        button {
            border: none;
            background: none;
            cursor: pointer;
            padding: 5px;
            font-size:15px;
            color: #999;
            position: absolute;
            right: 0;
            z-index: 2;
        }
    }
    .preview {
        display:none;
        position: absolute;
        width: 95px;
        height: 95px;
        top: 14px;
        left: 5px;
    }
}
.select {
      .upload-select {
          display:block;
      } 
      .upload-result,.upload-progress,.preview {
          display:none;
      } 
}
.progress {
    .upload-progress,.preview {
        display:block;
    }
    .upload-select,.upload-result {
        display:none;
    }
}
.result {
    .upload-result,.preview {
        display:block;
    }
    .upload-progress,.upload-select {
        display:none;
    }
}
</style>