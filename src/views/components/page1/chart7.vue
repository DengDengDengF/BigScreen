<template>
  <div class="behaviorBar" ref="behaviorBar"></div>
</template>


<script>

import {getCurrentInstance, onMounted, ref, markRaw} from "vue";

export default {
  name: 'chart7',
  props: {
    data: {
      type: Array, // 根据你的数据类型调整
      required: true,
    },
  },
  setup(props) {
    const myChart = ref(null);
    const behaviorBar = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const setChart = function () {
      let option = {
        title: {
          text: '【柱图数据标题】',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal'
          },
          top: '5%',
          left: '31%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#11367a',
          formatter: "{b}:{c1}",
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        grid:
            {
              top: '25%',
              left: '1%',
              right: '4%',
              bottom: '4%',
              containLabel: true,

            },
        xAxis:
            {
              type: 'category',
              axisLabel: {
                interval: 0,
                color: '#75deef',
                fontSize: 9,
                showMinLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#1a3c58',
                  width: 2
                }
              },
              axisTick: {show: false},

              data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7', '数据8']
            },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 300,
            axisLabel: {
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            name: '(个)',
            nameGap: -5,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
              padding: [0, 6, 0, 0]
            },
            axisTick: {
              length: 3
            },
            axisLine: {
              lineStyle: {
                color: '#1a3c58'
              }
            },

            splitLine: {show: false}

          },
        ],
        series: [
          {
            name: '辅助',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              color: "#252448",
            },
            data: [300, 300, 300, 300, 300, 300, 300, 300]
          },
          {
            name: '数据',
            type: 'bar',
            barWidth: 12,
            barGap: '-100%',

            data: props.data
          },
        ]
      };
      if (!myChart.value) myChart.value = markRaw(echarts(behaviorBar.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
      setChart();
    })
    return {
      behaviorBar,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.behaviorBar {
  height: 45%;
}
</style>
