<template>
    <h2 style="color:#fff">滚动可查看懒加载图片</h2>
    <!-- 图片容器 -->
    <div class="container">
        <div v-for="item in imageList">
            <!-- 初始时使用空src，并在data-src中指定真实图片路径 -->
            <img v-img-lazy:src="item" src=""> 
        </div>
    </div>
</template>

<script setup>
// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/cac68a7880bec1c72dcfce112d10e955.png",
  "https://yanxuan-item.nosdn.127.net/06a158d2888b20383a466227e39bbbc7.jpg",
  "https://yanxuan.nosdn.127.net/8f8092d5bf6a133a8cb59ab7b9f790e9.png",
  "https://yanxuan-item.nosdn.127.net/eac6c40fdb0f977fdf80048d7b181ffa.png",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]
</script>

<style lang="scss" scoped>
.container {
        margin-top: 900px;
}
img {
    width: 230px;
    height: 160px;
    margin-left: 10px;
    background-color: #f2f2f2;
}
</style>