<template>
    <div class="map-wrap">
        <div id="container">
        </div>
        <div class="oper-list">
            <el-button type="primary" @click="start">开始</el-button>
            <el-button type="primary" @click="pause">暂停</el-button>
            <el-button type="primary" @click="resume">继续</el-button>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import apiKey from '@/utils/config'

onMounted(()=> {
    initMap()
})
onUnmounted(() => {
  map?.destroy();
})
let map = null;
let marker,
lineArr = [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]]
function initMap() {
    AMapLoader.load({
        key: apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        plugins: ["AMap.ToolBar", "AMap.Scale"], //需要使用的的插件列表
    }).then(AMap => {
         map = new AMap.Map("container", {
            viewMode: '2D', //默认使用 2D 模式
            zoom: 11, //地图级别
            center: [116.395577, 39.892257], //地图中心点
            mapStyle: "amap://styles/dark", //设置地图的显示样式
        });

        const toolbar = new AMap.ToolBar(); //创建工具条插件实例
        map.addControl(toolbar); //添加工具条插件到页面
        const scale = new AMap.Scale();
        map.addControl(scale);

        // 添加标记 
        marker = new AMap.Marker({
            map: map,
            position: [116.478935,39.997761],
            icon: "https://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true,
            angle:-90,
        });
        // 绘制轨迹 轨迹颜色
       const polyline = new AMap.Polyline({
           map: map,
           path: lineArr,
           showDir:true,
           strokeColor: "#28F",  //线颜色
           strokeWeight: 6,      //线宽
       });
 
       //轨迹回放颜色
       const passedPolyline = new AMap.Polyline({
         map: map,
         strokeColor: "#f60",  //线颜色
         strokeWeight: 6,      //线宽
       });

       // 设置移动过的路线  监听车辆移动事件
       marker.on('moving', function (e) {
            // 延长驾驶途径过的轨迹
            passedPolyline.setPath(e.passedPath);
       });

        //视野居中
        map.setFitView();

    }).catch((e) => {
      console.error(e); //加载错误提示
    })
}

//开始
function start(){
  //设置移动路线及速度,
  marker.moveAlong(lineArr, 100); 
}
//暂停
function pause(){
  marker.pauseMove(); 
}
//继续
function resume(){
  marker.resumeMove(); 
}

</script>

<style lang="scss" scoped>
html,
body,
.map-wrap,
#container {
    width: 100%;
    height: 100%;
}
.map-wrap {
    position: relative;
}
.oper-list {
    position: absolute;
    top: 0;
    right: 10px;
    .el-button {
        background: rgba(0,0,0,0.5);
        border: 0;
    }

}


</style>