<template>
    <div class="cantainer">
        <h2 class="title">文件上传demo</h2>
        <div class="upload-wrap">
            <component v-for="item in compList" :is="item.component" :key="item.name"></component>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import SingleUpload from './components/sigleUpload.vue'
import Base64Upload from './components/base64Upload.vue'
import BinaryUpload from './components/binaryUpload.vue'
import DragUpload from './components/dragUpload.vue'
import CutUpload from './components/cutUpload.vue'
import SliceUpload from './components/sliceUpload.vue'

const compList = [
    {name: 'singleUpload',component:SingleUpload},
    {name: 'base64Upload',component:Base64Upload},
    {name: 'binaryUpload',component:BinaryUpload},
    {name: 'dragUpload',component:DragUpload},
    {name: 'cutUpload',component:CutUpload},
    {name: 'sliceUpload',component:SliceUpload},
]

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
</style>