<template>
  <div class="doubleArea" ref="doubleArea"></div>
</template>
<script>

import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'chart1',
  props: {
    selectRangeDate: {
      type: Array, // 根据你的数据类型调整
      required: true,
    },
  },
  setup(props) {
    // console.log(props.selectRangeDate[0])
    const myChart = ref(null);
    const doubleArea = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    //用于refs测试
    const test = function () {
      console.log('ele from chart1')
    }

    const setData = function (type) {//数据模拟
      let arr = [];
      switch (type) {
        case 'x': // 设置横坐标 时间数据
          for (let i = 0; i < props.selectRangeDate.length; i++) {
            arr.push(props.selectRangeDate[i][0] + '.' + props.selectRangeDate[i][1] + '.' + props.selectRangeDate[i][2])
          }
          break;
        case 's':// 访问次数数据模拟
          for (let i = 0; i < props.selectRangeDate.length; i++) {
            arr.push((Math.random() * 6).toFixed(0))
          }
          break;
        case 'n': // 访问人数数据
          for (let i = 0; i < props.selectRangeDate.length; i++) {
            arr.push((Math.random() * 600).toFixed(0))
          }
          break;

        default:
          break;
      }

      return arr;

    }

    const setChart = function () {
      let option = {
        legend: { // 图例信息
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#75deef',
            fontSize: 12,
          },
          right: '5%',
          top: '5%',
        },
        grid: [
          { // 上区域图
            top: '20%',
            bottom: '45%',
            left: "8%",
            right: '5%',
            containLabel: false
          },
          { // 下区域图
            top: '55%',
            bottom: '10%',
            left: "8%",
            right: '5%',
            containLabel: false

          },
        ],
        yAxis: [{ // 上区域图 y轴
          type: 'value',
          inverse: false,
          splitNumber: 3,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58'
            }
          },
          name: "(次)",
          nameTextStyle: {
            color: "#75deef",
            fontSize: 10,
            padding: [0, 15, -10, 0]
          },
          axisTick: {
            show: true

          },
          axisLabel: {
            showMaxLabel: true,
            color: '#75deef',
            fontSize: 9,
            fontWeight: 'normal'
          },
          splitLine: {
            show: false,
          }
        },
          { // 下区域图 y轴
            gridIndex: 1,
            splitNumber: 3,
            inverse: true,
            type: 'value',
            name: "(人)",
            nameLocation: 'end',
            nameTextStyle: {
              color: "#75deef",
              fontSize: 10,
              padding: [-10, 25, 0, 0]
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              show: true
            },
            position: 'bottom',
            axisLabel: {
              show: true,
              color: '#75deef',
              fontSize: 9,
              fontWeight: 'normal',
              showMaxLabel: true,

            },
            splitLine: {
              show: false,
              lineStyle: {
                width: 0
              }
            }
          }
        ],
        xAxis: [
          { // 上图x轴
            type: 'category',
            boundaryGap: false,
            z: 2,
            nameGap: 0,
            axisLine: {
              show: false,

              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: setData('x')

          },
          { // 下图x轴
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [4, 8],
              symbolOffset: [0, 8],
              lineStyle: {
                color: '#1a3c58'
              }
            },
            z: 2,
            axisTick: {
              show: false,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisLabel: {
              show: false
            },
            data: setData('x')
          },
          { // 最下刻度轴
            gridIndex: 1,
            position: 'bottom',
            type: 'category',
            name: "日",
            nameLocation: 'end',
            nameTextStyle: {
              color: "#75deef",
              fontSize: 9,
              padding: [25, 0, 0, -25]
            },
            boundaryGap: false,
            axisLine: { // 轴线
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [4, 8],
              symbolOffset: [0, 8],
              lineStyle: {
                color: '#1a3c58'
              }
            },
            z: 2,
            axisTick: { // 刻度
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisLabel: { // 标签
              show: true,
              interval: 0,
              showMaxLabel: false,
              align: "left",
              color: '#75deef',
              fontSize: 9,
              fontWeight: 'normal',

            },
            data: setData('x')

          }
        ],
        tooltip: { // hover 提示框
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
          formatter: (data) => {
            if (data[0].componentIndex == 0) { // hover 到上图的时候
              return data[0].name + '<br>' + data[0].seriesName + ":" + data[0].value + "次" + '<br>' + data[1].seriesName + ":" + data[1].value + "次"
            } else {
              return data[0].name + '<br>' + data[0].seriesName + ":" + data[0].value + "人" + '<br>' + data[1].seriesName + ":" + data[1].value + "人"
            }
          }
        },
        series: [ // 面积图
          {
            name: '数据1',
            type: 'line',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              width: 1,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(250, 206, 21, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(253, 116, 48, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              opacity: .18,
              color: 'rgba(243, 121, 46, 1)'
            },

            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(250, 206, 21, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(253, 116, 48, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            data: setData('s')
          },
          {
            name: '数据2',
            type: 'line',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              width: 1,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(51, 231, 252, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(11, 120, 227, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              opacity: .5,
              color: 'rgba(19, 34, 96, 1)'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(51, 231, 252, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(11, 120, 227, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            data: setData('s')
          },
          {
            name: '数据1',
            type: 'line',
            symbol: 'none',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              width: 1,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(250, 206, 21, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(253, 116, 48, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              opacity: .18,
              color: 'rgba(243, 121, 46, 1)'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(250, 206, 21, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(253, 116, 48, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            data: setData('n')
          },
          {
            name: '数据2',
            type: 'line',
            symbol: 'none',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              width: 1,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(51, 231, 252, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(11, 120, 227, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              opacity: .5,
              color: 'rgba(19, 34, 96, 1)'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(51, 231, 252, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'rgba(11, 120, 227, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            data: setData('n')
          },

        ]
      };
      if (props.selectRangeDate.length > 7) { // 当x轴数据超过7个的时候 x轴刻度显示
        option.xAxis[2].axisLabel.interval = 3; // x轴刻度隔3个显示
        option.xAxis[2].axisLabel.showMaxLabel = false;
      }
      //Echarts 管理的状态和数据与 Vue 的响应式产生冲突，导致Echarts 无法正常更新而
      //取消vue的响应式系统观测Echarts变化，让echarts自动更新
      //用markRaw将Echarts实例标记为原始对象
      if (!myChart.value) myChart.value = markRaw(echarts(doubleArea.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
      setChart();
    })
    return {
      test,
      myChart,
      doubleArea,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.doubleArea {
  width: 100%;
  height: 100%;
}
</style>
