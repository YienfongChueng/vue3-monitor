<template>
    <div>
        <div id="container">
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

function initMap() {
     AMapLoader.load({
        key: apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        plugins: ["AMap.CitySearch", "AMap.Weather"], //需要使用的的插件列表
    }).then(AMap => {

        AMap.plugin('AMap.Weather', function() {
            //创建天气查询实例
            var weather = new AMap.Weather();

            //执行实时天气信息查询
            weather.getLive('广州市', function(err, data) {
                console.log(data,err);
            });
            //执行实时天气信息查询
            weather.getForecast('广州市', function(err, data) {
                console.log(data,err);
            });
        });

    }).catch(err => {
        console.log(err)
    })
}

</script>

<style lang="scss" scoped>

</style>