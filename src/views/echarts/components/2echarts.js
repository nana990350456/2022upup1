// 数据
var captions = [  '福州',
    '厦门',
    '福建',
    '泉州',
    '龙岩',
    '三明',
    '南平',
    '宁德',
    '省超'];//时间
var values1 = [60, 90, 80, 70, 60, 50,90,80,50];
var values2 = [50, 62, 82, 77, 72, 10,80,90,70];
let valueList = [values1, values2]; // 数据汇合

let legendData = ['3级以上', '4级以下']; // 图例数据 
let colorList = ['#5B8FF9', '#61DDAA']; // 颜色系
let seriesData = []; // series数据
legendData.map((item, index) => {
   seriesData.push({
      name: item,
      type: 'line',
      data: valueList[index],
      symbolSize: 8, //标记的大小
      lineStyle: {
         color: colorList[index],
         width: 3,
      },
      itemStyle: {
         //折线拐点标志的样式
         color: colorList[index],
         borderColor: colorList[index],
         borderWidth: 5,
      },
      emphasis: {
         scale: 1.5
      },
    label: {
     show: true,
     position: 'top',
      formatter: '{c}%',//显示百分号
        }
   })
})

var option = {
   tooltip: {
      trigger: "axis",
     extraCssText: 'width:110px;height:60px;',
   formatter(params) {
    let str = '';
    str += `<div>${params[0].name}</div>`;
    for (let i = 0; i < params.length; i += 1) {
      str += `${params[i].marker} <span>${params[i].seriesName}</span>&nbsp;&nbsp;&nbsp;<span>${params[i].data ? Math.round(params[i].data)+'%' : '0'
      }</br>`;
    }
    return str;
  }
   },
  	legend: {
					data: legendData,
					right: '35%',
					top: '0',
					icon: "rect",
					itemWidth: 24, // 设置宽度
					itemHeight: 14, // 设置高度
					itemGap: 24,
					textStyle: {
						color: 'rgba(0, 0, 0, 0.85)',
						fontFamily: 'Source Han Sans CN-Regular',
						fontSize: 12,
						padding: [0, 0, 0, 5]
					}
				},
   grid: {
      left: '20',
      right: '28',
      top: '60',
      bottom: '24',
      containLabel: true
   },
   xAxis: {
      type: 'category',
      data: captions,
      axisTick: {
         show: false //隐藏X轴刻度
      },
      axisLine: {
         lineStyle: {
            color: 'rgba(204, 204, 204, 1)',
         }
      },
      axisLabel: {
         show: true,
         textStyle: {
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.65)", //X轴文字颜色
            fontFamily: 'Source Han Sans CN-Regular'
         }
      },
   },
   yAxis: {
      name: "单位：项",
      nameTextStyle: {
         fontSize: 14,
         color: "rgba(0, 0, 0, 0.65)", //X轴文字颜色
         fontFamily: 'Source Han Sans CN-Regular',
         align:"left",
         verticalAlign: "center",
         padding:[0,0,10,-30]
      },
      type: 'value',
      axisTick: {
         show: false
      },
      splitLine: {
         lineStyle: {
            type: 'dashed',
            width: 1,
            color: 'rgba(223, 223, 223, 1)',
            opacity: '1',
         }
      },
      axisLine: {
         show: false,
      },
      axisLabel: {
         show: true,
         textStyle: {
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.65)",
            fontFamily: 'HarmonyOS Sans-Regular'
         }
      },
      splitArea: {
         show: false
      }
   },
   series: seriesData
};