<script setup>
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import apiKey from '@/utils/config'

let map = ref(null);
let inglat = ref('');
function initMap() {
  AMapLoader.load({
    key: apiKey  //申请好的开发者key,首次调用load时填入
  })
    .then(AMap => {
      map.value = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 13, //初始化地图层级
        layers: [
            // 卫星
            new AMap.TileLayer.Satellite(),
            // 路网
            new AMap.TileLayer.RoadNet()
        ],
        center: [116.397428, 39.90923] //初始化地图中心点
      });


    })
    .catch(err => {
      console.log(err)
    })
}
initMap();
</script>

<template>
  <div id='container'></div>
</template>

<style scoped>
html,
body,
#container {
  width: 100%;
  height: 100%;
}
</style>
