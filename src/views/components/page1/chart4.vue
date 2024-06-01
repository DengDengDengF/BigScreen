<template>
  <div class="ring" ref="ring"></div>
</template>

<script>
import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'chart4',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const myChart = ref(null);
    const ring = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const setChart = function () {
      let option = {
        title: {
          text: '【' + props.data.title + '】',
          top: 20,
          x: 'center',
          textStyle: {
            color: '#75deef',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)",
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        series: [
          {
            name: props.data.title,
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: 'outside',
              fontSize: 10,
              color: '#75deef'
            },
            labelLine: {
              show: true,
              length: 8,
              length2: 5,
              lineStyle: {
                color: '#303851'
              }
            },
            data: props.data.data
          }
        ]
      };
      if (!myChart.value) myChart.value = markRaw(echarts(ring.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
      setChart();
    })
    return {
      ring,
      setChart,
    }
  }
}

</script>


<style scoped lang="less">
.ring {
  width: 100%;
  height: 100%;
}
</style>
