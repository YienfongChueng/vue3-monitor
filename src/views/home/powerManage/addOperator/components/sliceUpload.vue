<template>
    <div class="upload-item">
        <h1>大文件分片上传</h1>
        <input type="file" @change="inputChange"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import SparkMD5 from "spark-md5";

async function inputChange(e) {
    const file = e.target.files[0]
    const chunks = chunckFile(file,10*1024) // 10kb
    const result = await hashHandle(chunks)
    console.log(result)
}

function hashHandle(chunks) {
    return new Promise((resolve,reject) => {
        let sparkMD5 = new SparkMD5()
        function _read(i){
            if(i >= chunks.length) {
                resolve(sparkMD5.end())
                return; //读取完成
            }
            const blob = chunks[i]
            const reader = new FileReader()
            reader.onload = function(e) {
                const bytes = e.target.result // 读取到的字节数组
                sparkMD5.append(bytes) // 增量计算
                _read(i+1)
    
            }
            reader.readAsArrayBuffer(blob)
        }
        _read(0)
    })
}

function chunckFile(file,chunckSize) {
    const result = []
    for (let index = 0; index < file.size; index+=chunckSize) {
        const peace = file.slice(index,index + chunckSize)
        result.push(peace)
    }
    
    console.log(result)
    return result
}

</script>

<style lang="scss" scoped>
.upload-item {
    background: #eee;
    border-radius: 8px;
    padding: 10px;
}

</style>