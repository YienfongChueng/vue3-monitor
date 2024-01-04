<script setup>
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import apiKey from '@/utils/config'

let map = ref(null);
function initMap() {
  AMapLoader.load({
    key: apiKey  //申请好的开发者key,首次调用load时填入
  })
    .then(AMap => {
      map.value = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 13, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
      });

        //文本標記
      // let text = new AMap.Text({
      //   text:'文本內容',
      //   position:[116.397428, 39.90923] ,
      //   angle:20, //角度
      //   //支持拖動
      //   draggable:true,
      //   style:{
      //     padding:'10px',
      //     fontSize:'30px',
      //     background:'#f60'
      //   }
      // })
      // text.setMap(map.value);

      //图标标记
      let carMarker = new AMap.Marker({
        position:[116.397428, 39.90923],
        icon: 'https://webapi.amap.com/images/car.png',
        offset:new AMap.Pixel(0,0)
      })
      let marker = new AMap.Marker({
        position:[116.397428, 39.90923],
        icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
        offset:new AMap.Pixel(-100,-30)
      })
      //添加到地图
      map.value.add([carMarker,marker])

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
