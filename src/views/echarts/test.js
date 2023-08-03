let xData = [
    '福州',
    '厦门',
    '福建',
    '泉州',
    '龙岩',
    '三明',
    '南平',
    '宁德',
    '省超'
]; // 类型
var data1Arr = [4, 6, 12, 9,10 , 12, 16, 8, 9]; // 数据1
var data2Arr = [7, 3, 15, 8, 10, 14, 17,10, 13]; // 数据2

var dataName = ['省级查纠', '地市查纠'];
let zoomShow = xData.length > 10;

let dataList = [data1Arr, data2Arr];
let colorList = [
    {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
            {
                offset: 0,
                color: 'rgba(6,169,157,0.3)'
            },
            {
                offset: 1,
                color: 'rgba(6,169,157,1)'
            }
        ]
    },
    {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
            {
                offset: 0,
                color: 'rgba(3,142,253,0.3)'
            },
            {
                offset: 1,
                color: 'rgba(3,142,253,1)'
            }
        ]
    }
];

let seriousList = [];
dataName.map((item, index) => {
    seriousList.push({
        name: dataName[index],
        label: {
            show: false
        },
        color: colorList[index],
        itemStyle: {
            barBorderRadius: [2, 2, 0, 0]
        },
        type: 'bar',
        barWidth: '15', //柱型宽度
        data: dataList[index]
    });
});

let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        textStyle: {
            fontSize: 12
        }
    },
    dataZoom: [
        {
            show: zoomShow, //flase直接隐藏图形
            type: 'slider',
            backgroundColor: 'transparent',
            brushSelect: false, // 是否开启刷选功能
            zoomLock: false, // 是否锁定选择区域大小
            height: 7,
            //left: 'center', //滚动条靠左侧的百分比
            bottom: 0,
            startValue: 0, //滚动条的起始位置
            endValue: 8, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            handleStyle: {
                color: '#E8E8E8',
                borderColor: '#E8E8E8'
            },
            fillerColor: '#E8E8E8',
            borderColor: 'transparent',
            showDetail: false,
            dataBackground: {
                areaStyle: {
                    opacity: 0
                },
                lineStyle: {
                    color: 'transparent'
                }
            }
        }
    ],
    legend: {
        data: dataName,
        right: '35%',
        top: '0',
        //icon: "circle",
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
        left: '10',
        right: '10',
        top:'40',
        bottom: '10', //下边距,
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#808080',
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Source Han Sans CN-Regular'
                }
            },
            data: xData
        }
    ],
    yAxis: [
        {
            //name: '单位：人',
            nameTextStyle: {
                color: '#808080',
                fontSize: 12,
                fontFamily: 'Source Han Sans CN-Regular',
                align: 'left',
                padding: [0, 0, -5, 0]
            },
            type: 'value',
            splitLine: {
                //y轴网格线
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    type: 'dashed'
                }
            },
            axisLabel: {
                //y轴文本
                //showMinLabel: false, //y轴是否设置最小刻度0
                color: '#808080',
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Source Han Sans CN-Regular'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                //y轴线
                show: false,
                lineStyle: {
                    color: '#D1D1D1'
                }
            }
        }
    ],
    series: seriousList
};
