<template>
  <div class="webPie">
    <div class="webPie-title">
            <span class="subtitle"><span class="leftCircle"
                                         :style="{background:data.color}"></span>{{ data.title }}<span
                class="rightCircle" :style="{background:data.color}"></span></span>
    </div>
    <div class="webPie-content" :id="id" ref="web">

    </div>
  </div>
</template>

<script>
import {onMounted, ref, getCurrentInstance} from 'vue';

export default {
  name: 'pie',
  props: {
    id: {
      type: String, // 根据你的数据类型调整
      required: true,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const myChart = ref(null);
    const web=ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;

    const setChart = function () {
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10
          },
          formatter: "{b}:{d}%"
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            label: {
              color: '#75deef',
              fontSize: 8,
              formatter: function (data) {
                return data.data.name + ' ' + (data.percent).toFixed(0) + '%';
              }
            },
            labelLine: {
              length: 10,
              length2: 8,
              lineStyle: {
                color: 'rgb(57,63,90)'
              }
            },
            data: props.data.data,
          }
        ]
      };
      if (!myChart.value) myChart.value = echarts(web.value);
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
    }
    onMounted(() => {
          setChart();
    })
    return {
      myChart,
      web,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.webPie {
  width: 100%;
  height: 100%;

  .webPie-title {
    height: 20%;
    text-align: center;

    .subtitle {
      color: #68C6D6;
      position: relative;
      font-size: 12px;

      .leftCircle {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        left: -15px;
        top: 5px;
      }

      .rightCircle {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        right: -15px;
        top: 5px;
      }
    }
  }

  .webPie-content {
    height: 80%
  }
}
</style>
