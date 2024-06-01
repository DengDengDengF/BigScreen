<template>
  <div class="popularBar" ref="popularBar"></div>
</template>

<script>
import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'chart3',
  setup(props) {
    const myChart = ref(null);
    const popularBar = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const setOptionData = function () {
      let nameData = ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '其他'];
      let data = [45, 33, 13, 25, 30, 35, 45];
      let colorList = ['#2871ea', '#fbe831', '#2ea5fe', '#fc662f', '#9f56f0', '#bf232c', '#64cef2'];
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          name: nameData[i],
          value: data[i],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: colorList[i] // 0% 处的颜色
              }, {
                offset: 1, color: '#922aea' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
        arr.push(obj)
      }
      return arr;
    }
    const setChart = function () {
      let option = {
        grid: [{
          top: '10%',
          bottom: '15%',
          right: '5%',
          left: '55.5%'
        },
          {
            top: '10%',
            bottom: '15%',
            right: '52.5%',
            left: '8%'
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
          formatter: (params) => {
            if (params[5].seriesName == '人数') {
              return params[5].name + ':' + params[5].value + '人'
            } else {
              return params[5].name + ':' + params[5].value + '次'
            }

          }
        },
        yAxis: [
          {
            data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '其他'],
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            inverse: true,
            axisLabel: {
              show: false,
              fontSize: 10,
              margin: 4,
              inside: true,
              color: 'rgb(113,227,247)'
            }
          },
          {
            data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '其他'],
            gridIndex: 1,
            position: 'right',
            axisTick: {
              show: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            inverse: true,
            axisLabel: {
              show: false,
              fontSize: 10,
              margin: 4,
              inside: true,
              color: 'rgb(113,227,247)'
            }
          },
        ],
        xAxis: [{
          type: 'value',

          splitLine: {show: false},
          axisTick: {show: true},
          axisLabel: {
            show: true,
            color: '#75deef',
            fontSize: 9,
            showMaxLabel: false,
          },
          name: '(人)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'left',
            padding: [0, 0, -24, 0]
          },
          max: 60,
          splitNumber: 6,
          min: 10,
          scale: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58'
            }
          },
        },
          {
            type: 'value',
            inverse: true,
            splitLine: {show: false},
            axisTick: {show: true},
            gridIndex: 1,
            axisLabel: {
              show: true,
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            name: '(次)',
            nameGap: -10,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
              padding: [0, 0, -24, 0]
            },
            max: 60,
            splitNumber: 7,
            min: 10,
            scale: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
          },
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            barWidth: 5,
            stack: 'b',
            barCategoryGap: 20,
            z: 10,
            label: {
              show: true,
              formatter: '{b}',
              position: 'insideBottomLeft',
              offset: [-10, 0],
              fontSize: 12,
              color: '#75deef'
            },
            data:setOptionData(),

          },

          {
            name: '次数',
            type: 'bar',
            barWidth: 5,
            xAxisIndex: 1,
            yAxisIndex: 1,
            stack: 'd',
            barCategoryGap:20,
            z: 10,
            label: {
              show: true,
              formatter: '{b}',
              position: 'insideBottomRight',
              offset: [10, 0],
              fontSize: 12,
              color: '#75deef'
            },
            data: setOptionData(),
          }
        ]
      };
      if (!myChart.value) myChart.value = markRaw(echarts(popularBar.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
      setChart();
    })
    return {
      popularBar,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.popularBar {
  height: 100%;
  width: 100%;
}
</style>
