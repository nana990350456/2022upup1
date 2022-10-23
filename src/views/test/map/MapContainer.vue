<template>
     <div id="container">
        
       <el-button type="primary" class="btn" @click="changeFn">显示/隐藏路况</el-button>
       <div v-loading="true"></div>
     </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { setStorage,getStorage } from "@/utils/storage";
export default {
    name:'MapContainer',
    data(){
      return{
        isVisible:true,
        //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
        // map:null,
        trafficLayer:null
     }    
 },
 mounted(){
    //DOM初始化完成进行地图初始化
    this.initMap();
},
 methods:{
    initMap(){
        AMapLoader.load({
            key:"a7ac132128ce0ddea3e1936d3e94ed22",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Scale'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            this.map = new AMap.Map("container",{  //设置地图容器id
                viewMode:"3D",    //是否为3D地图模式
                zoom:12,           //初始化地图级别
                center:[118.7,32.1], //初始化地图中心点位置
                pitch:45,//俯仰角度
                roofColor:'lightgreen' ,//放大之后顶部颜色设置
                showIndoorMap:true
            });           
            //实时路况图层
    this.trafficLayer = new AMap.TileLayer.Traffic({
          'autoRefresh': true, 
        zIndex: 10,
        zooms: [7, 22],
    });
    
      this.trafficLayer.setMap(this.map);
    //   this.map.add(trafficLayer); //通过add方法添加图层
    //map.remove(traffic) //需要时可以移除
// 同时引入工具条插件，比例尺插件和鹰眼插件
let that=this
AMap.plugin([
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.HawkEye',
    'AMap.MapType',
    'AMap.Geolocation',
        'AMap.ControlBar',
        'AMap.GeoJSON'
], function(){
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    that.map.addControl(new AMap.ToolBar());

    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    that.map.addControl(new AMap.Scale());

    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    // that.map.addControl(new AMap.HawkEye({isOpen:true}));
   
    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    that.map.addControl(new AMap.MapType());
   
    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    that.map.addControl(new AMap.Geolocation());
       // 添加 3D 罗盘控制
   that.map.addControl(new AMap.ControlBar({
            position: {
                    right: '0px',
    bottom: '144px'
            },
            showControlButton: true,  // 是否显示倾斜、旋转按钮。默认为 true
        }));
});

            // 矢量图形  //实现数据的持久化
            // 定义一个全局变量保存GeoJSON
             var geojson = new AMap.GeoJSON({
                geoJSON:null
                })
            // 导入数据
             if(getStorage('geojson')){//如果存在数据，再加载
          geojson.importData(getStorage('geojson'))
        //   对于旧的数据也可以设置点击
        geojson.eachOverlay(function(item){
           item.on('click',function(e){
            console.log('旧数据点击了',e);
           })
        })
             }
             this.map.add(geojson)



// 地图添加点击事件
this.map.on('click', function(e){
console.log(`点击的经度：${e.lnglat.lng},纬度是：${e.lnglat.lat}`);
    // 创建一个 Marker 实例：
let marker = new AMap.Marker({
    position: e.lnglat,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
});
marker.on('click',function(e){
    console.log('新点击了',e);
})
// that.map.add(marker);
geojson.addOverlay(marker) //通过geojson来管理覆盖物
console.log(geojson);
setStorage('geojson',geojson.toGeoJSON()) //将当前对象包含的覆盖物转换为GeoJSON对象
})
// 添加矢量图形圆
var circle = new AMap.Circle({
    center: new AMap.LngLat(118.679807,32.230923),  // 圆心位置
    radius: 1000, // 圆半径
    strokeColor: 'red', // 描边颜色
    fillColor:'#fff',//填充颜色
    strokeWeight: 2, // 描边宽度
});

this.map.add(circle);

// 计算两个点之间的距离
// 1.创点
let m1 = new AMap.Marker({
    map:this.map,  //将m1添加到map地图中
    position: new AMap.LngLat(118.647872, 32.223871),
    draggable : true //是否可拖动
});
let m2 = new AMap.Marker({
    map:this.map, //将m2添加到map地图中
    position: new AMap.LngLat(118.683083, 32.154027),
    draggable : true //是否可拖动
});
// this.map.add([m1,m2]);
 this.map.setFitView() //自动缩放地图到合适的视野级别，参数均可缺省。
// 2.准备一条线，创建折线实例
let polyline = new AMap.Polyline({
    borderWeight: 2, // 线条宽度，默认为 1
    strokeColor: 'blue', // 线条颜色
});
 polyline.setMap(this.map) //添加到地图上面
// 3.准备文本
var text = new AMap.Text({
    position: new AMap.LngLat(118.683083, 32.154027),
    text: '猪头山',
    style: {'background-color':'#999'},
});
text.setMap(this.map) //添加到地图上面和    add添加的一样

// 4.计算两点之间线的距离
    function computeDis(){
        var p1 = m1.getPosition(); //获取覆盖物位置经纬度
        var p2 = m2.getPosition();
    //   希望文本显示在中间
    let textPos= p1.divideBy(2).add(p2.divideBy(2))  //p1+p2 /2
    var distance = Math.round(p1.distance(p2));
          var path = [p1,p2];
        polyline.setPath(path);  //绘制线
        text.setText('两点相距'+distance+'米')
        text.setPosition(textPos)  
    }
     computeDis();
    m1.on('dragging', computeDis)
    m2.on('dragging', computeDis)
        }).catch(e=>{
            console.log(e);
        })
    },
    clickHandler(e){
    //   console.log(e);
    console.log(`点击的经度：${e.lnglat.lng},纬度是：${e.lnglat.lat}`);
//     // 创建一个 Marker 实例：
// let marker = new AMap.Marker({
//     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//     title: '北京'
// });
    },
    changeFn(){
        if (this.isVisible) {
            this.trafficLayer.hide();
            this.isVisible = false;
        } else {
            this.trafficLayer.show();
            this.isVisible = true;
        }
    },
},
watch:{
    map(newal){ //不在data里面声明的对象是没有响应式的
       console.log(newal,'----------');
    }
}
}
</script>



<style lang="less"  scoped>
    #container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 800px;
        .btn {
           position: absolute;
           left: 100px;
           top: 200px;
           z-index: 100;
        }
      
    }
 
</style>
<style >
      .amap-controls .amap-control.amap-toolbar {
            position: absolute;
    right: 30px !important;
    bottom: 74px !important;
        }
</style>