<template>
  <div class="webBar" ref="webBar"></div>
</template>

<script>

import {onMounted, ref, getCurrentInstance,markRaw} from 'vue';

export default {
  name: 'chart2',
  props: {
    data: {
      type: Object, // 根据你的数据类型调整
      required: true,
    },
  },
  setup(props) {
    const myChart = ref(null);
    const webBar = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const setData = function () {
      var max = Math.max.apply(null, props.data.value);
      var arr = []
      for (let i = 0; i < 6; i++) {
        arr.push(max / 10)
      }
      return arr;
    }
    //网站
    const setChart = function () {
      let option = {
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
            params[1].number = props.data.number
            return params[1].name + "<br>" + params[1].seriesName + ":" + params[1].number + "/" + params[1].value + "人"
          }
        },
        grid: {
          left: '4%',
          top: '5%',
          bottom: 10,

          containLabel: true,
        },
        yAxis:
            {
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#1a3c58'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                margin: 13,
                fontSize: 10,
                color: '#75deef'
              },
              data: props.data.data
            },
        xAxis:
            {
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
              },
              splitLine: {
                show: false,
              }
            }
        ,
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            barCategoryGap: 20,
            barWidth: 8,
            itemStyle: {
              color: 'rgba(0,0,0,0)'
            },
            data: setData()
          },
          {
            name: props.data.name,
            type: 'bar',
            stack: '总量',
            barCategoryGap: 20,
            barWidth: 8,
            itemStyle: {
              color: { // 颜色线性渐变
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: 'rgb(' + props.data.color + ',0.1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgb(' + props.data.color + ',1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              borderRadius: 5,
            },
            data: props.data.value
          },
        ]
      };
      if (!myChart.value) myChart.value = markRaw(echarts(webBar.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
      // 处理点击事件并且跳转到相应的百度搜索页面
      myChart.value.on('click', function(params) {
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      });
    }
    onMounted(() => {
      // console.log(props.data.data)
      setChart();
    })
    return {
      myChart,
      webBar,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.webBar {
  float: left;
  width: 60%;
  height: 100%;
}
</style>
