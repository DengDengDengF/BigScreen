`
<template>
  <div class="pieMain" ref="pieMain"></div>
</template>
<script>
import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'chart6',
  props: {
    data: {
      type: Object, // 根据你的数据类型调整
      required: true,
    },
  },
  setup(props) {
    const myChart = ref(null);
    const pieMain = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    //饼图
    const setChart = function () {
      let option = {
        title: {
          text: '【' + props.data.title + '】',
          x: 'center',
          top: 0,
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        series: [
          {
            type: 'pie',
            startAngle: 160,
            radius: [0, '30%'],
            label: {
              show: true,
              position: 'inside',
              fontSize: 10,
            },
            center: ['50%', '60%'],
            data: props.data.data,
          },
          {
            type: 'pie',
            startAngle: 160,
            radius: ['52%', '72%'],
            labelLine: {
              lineStyle: {
                color: '#444b62',

              },
              length: 5,
              length2: 5,

            },
            emphasis: {
              label: {
                color: '#fff',
                show: true,
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: 'outside',
              borderRadius: 4,
              color: '#fff',
              fontSize: 10,
              padding: 0,
              backgroundColor: '#183566',
              formatter: "{b}{c}笔/{d}%"
            },
            center: ['50%', '60%'],
            data: props.data.data1
          }
        ]
      };
      if (!myChart.value) myChart.value = markRaw(echarts(pieMain.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);

      let obj = {
        type: 'highlight',
        name: []
      };
      for (let i = 0; i < props.data.data.length - 1; i++) {
        obj.name.push(props.data.data[i].name)
      }
      myChart.value.dispatchAction(obj);
      myChart.value.on('mouseout', function () {
        myChart.value.dispatchAction(obj);
      });
    }
    onMounted(() => {
      setChart();
    })

    return {
      pieMain,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.pieMain {
  width: 100%;
  height: 100%;
}
</style>
`
