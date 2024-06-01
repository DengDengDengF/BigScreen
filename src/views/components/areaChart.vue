<template>
  <div class="area" ref="area"></div>
</template>

<script>
import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'areaChart',
  props: {
    selectRangeDate: {
      type: Array, // 根据你的数据类型调整
      required: true,
    },
    config: {
      type: Object, // 根据你的数据类型调整
      required: true,
    }
  },
  setup(props) {
    const myChart = ref(null);
    const area = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const setData = function (type) {
      let arr = [];
      switch (type) {
        case 'x':
          for (let i = 0; i < props.selectRangeDate.length; i++) {
            arr.push(props.selectRangeDate[i][1] + "." + props.selectRangeDate[i][2])
          }
          break;
        case 's' :
          for (let i = 0; i < props.selectRangeDate.length; i++) {
            arr.push((Math.random() * 250).toFixed(0))
          }
          break;

        default:
          break;
      }

      return arr;
    }
    const setSeriesData = function () {
      let arr = [];
      props.config.data.forEach(item => {
        let obj = {
          name: item.name,
          type: 'line',
          smooth: true,
          symbol: "none",
          areaStyle: {
            opacity: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: item.color[0] // 0% 处的颜色
              },
                {
                  offset: 0.4, color: item.color[0] // 40% 处的颜色
                }, {
                  offset: 1, color: item.color[1] // 100% 处的颜色
                }],
              global: false // 缺省为 false
            }
          },
          lineStyle: {
            width: 0,
          },
          itemStyle: {
            color: item.color[0]
          },
          data: setData('s')
        }
        arr.push(obj)
      })
      return arr;
    }
    const setChart = function () {
      let option = {
        title: {
          show: !!props.config.title,
          text: props.config.title,
          textStyle: {
            color: props.config.color,
            fontSize: 12,
            fontWeight: 'normal'
          },
          top: '12%',
          left: '38%'
        },
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

          formatter: function (params) {
            let str = params[0].name;
            params.forEach(item=> {
              str += `<br> ${item.seriesName}: ${item.value}`
            })
            return str
          }
        },
        legend:
            {
              top: props.config.title?'23%': '11%',
              left: 'center',
              itemWidth: 7,
              itemHeight:7,
              textStyle: {
                color: props.config.color,
                fontSize: 12
              },
            },
        grid:
            {
              top: props.config.title?'40%': '14%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              containLabel: true
            },
        xAxis:
            {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                interval: 0,
                color: props.config.color,
                fontSize: 9,
                align: 'center'
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#1a3c58',
                  width: 2,
                }
              },
              axisTick: {show: false},
              data: setData('x')
            },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisLabel: {
              color: props.config.color,
              fontSize: 9,
              showMaxLabel: false,
            },
            axisTick: {
              length: 3
            },
            name: props.config.name[0],
            nameGap: -5,
            nameTextStyle: {
              color: props.config.color,
              fontSize: 9,
              align: 'right'
            },
            splitLine: {show: false}

          },
          {
            type: 'value',
            min: 0,
            max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              length: 3
            },
            axisLabel: {
              color: props.config.color,
              fontSize: 9,
              showMaxLabel: false,
            },
            name: props.config.name[1],
            nameTextStyle: {
              color: props.config.color,
              fontSize: 9,
              align: 'left'
            },
            nameGap: -5,
            splitLine: {show: false}
          },
        ],
        series: setSeriesData()
      };
      if (props.selectRangeDate.length > 7) {
        option.xAxis.axisLabel.interval = 3;
        option.xAxis.axisLabel.showMaxLabel = false;
        option.xAxis.axisLabel.align = 'left';
      }
      if (!myChart.value) myChart.value = markRaw(echarts(area.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
      setChart();
    })
    return {
      area,
      setChart,
    }
  }
}

</script>

<style scoped lang="less">
.area {
  height: 100%;
}
</style>
