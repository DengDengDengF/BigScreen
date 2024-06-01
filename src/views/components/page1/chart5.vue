<template>
  <div class="lines">
    <div class="switchButton">
      <a :class="{'active':value==1}" @click="handleSelect(1)">月</a><a :class="{'active':value==2}"
                                                                        @click="handleSelect(2)">日</a>
    </div>
    <div id="bottom_1" ref="bottom_1">

    </div>
  </div>
</template>


<script>
import {onMounted, ref, getCurrentInstance, markRaw} from 'vue';

export default {
  name: 'chart5',
  setup(props) {
    const myChart = ref(null);
    const bottom_1 = ref(null);
    const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;
    const value = ref(2);
    const xAxisData = ref([]);
    const seriesData = ref([]);
    const selected = ref({});
    const legendData = ref([]);
    const handleSelect = function (val) {
      xAxisData.value = [];
      seriesData.value = [];
      legendData.value = [];
      selected.value = {};
      value.value = val;
      let curYear = new Date().getFullYear();
      let curMonth = new Date().getMonth();

      let colorList = ['#bf232a', '#feed2c', '#2c7bfe', '#feac2c', '#ff7b7e', '#2cd9fe', '#a262f2', '#2ca8fe'];
      if (val == 1) {
        let year = [curYear - 1, curYear];
        for (let i = 0; i < 12; i++) {
          xAxisData.value.push((i + 1) + '月');
        }
        for (let i = 0; i < year.length; i++) {
          legendData.value.push(year[i] + '年');
          let obj = {
            name: year[i] + '年',
            type: 'line',
            symbol: 'circle',
            smooth: false,
            itemStyle: {
              color: colorList[i % 8]
            },
            lineStyle: {
              width: 1,
              color: colorList[i % 8],
            },
            data: []
          }
          for (let j = 0; j < 12; j++) {
            obj.data.push((Math.random() * 300).toFixed(0));
          }
          let obj1 = {
            name: year[i] + '年',
            type: 'line',
            symbol: 'circle',
            smooth: false,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: colorList[i % 8]
            },
            lineStyle: {
              width: 1,
              color: colorList[i % 8],
            },
            data: []
          }
          for (let j = 0; j < 12; j++) {
            obj1.data.push((Math.random() * 300).toFixed(0));
          }
          seriesData.value.push(obj);
          seriesData.value.push(obj1);
        }

      } else {
        let dateLength = new Date(curYear, curMonth, 0).getDate();
        for (let i = 0; i < dateLength; i++) {
          xAxisData.value.push((i + 1) + '号');

        }
        for (let i = 0; i < 12; i++) {
          legendData.value.push((i + 1) + '月');
          selected.value[(i + 1) + '月'] = false;
          if (i < 4) {
            selected.value[(i + 1) + '月'] = true;
          }
          let obj = {
            name: (i + 1) + '月',
            type: 'line',
            symbol: 'circle',
            smooth: false,
            itemStyle: {
              color: colorList[i % 8]
            },
            lineStyle: {
              width: 1,
              color: colorList[i % 8],
            },
            data: []
          }
          for (let j = 0; j < dateLength; j++) {
            obj.data.push((Math.random() * 300).toFixed(0));
          }
          let obj1 = {
            name: (i + 1) + '月',
            type: 'line',
            symbol: 'circle',
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth: false,
            itemStyle: {
              color: colorList[i % 8]
            },
            lineStyle: {
              width: 1,
              color: colorList[i % 8],
            },
            data: []
          }
          for (let j = 0; j < dateLength; j++) {
            obj1.data.push((Math.random() * 300).toFixed(0));
          }

          seriesData.value.push(obj);
          seriesData.value.push(obj1);
        }

      }
      setChart()
    }
    //交易分析
    const setChart = function () {
      let option = {
        title: [
          {
            text: '【交易笔数分析】',
            textStyle: {
              fontSize: 12,
              color: '#75deef',
              fontWeight: 'normal'
            },
            top: '24%',
            left: '20%'
          },
          {
            text: '【交易金额分析】',
            textStyle: {
              fontSize: 12,
              color: '#75deef',
              fontWeight: 'normal'
            },
            top: '24%',
            right: '12%'
          },
        ],
        grid: [
          {
            show: false,
            left: '2%',
            top: '38%',
            right: '51%',
            bottom: 0,
            containLabel: true,
          },
          {
            show: false,
            left: '51%',
            top: "38%",
            bottom: 0,
            right: '2%',
            containLabel: true,

          },
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'none',

          },
          backgroundColor: '#11367a',
          formatter: (params) => {
            let seriesId = params.seriesId.substr(params.seriesId.length - 1, 1)
            if (seriesId == 0) {
              return params.seriesName + "/" + params.name + "<br>" + "交易笔数:" + params.value + '笔'
            } else {
              return params.seriesName + "/" + params.name + "<br>" + "交易金额:" + params.value + '元'
            }

          },
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        legend: {
          type: 'scroll',
          top: '10%',
          textStyle: {
            color: '#75deef',
            padding: [3, 0, 0, 0],
            fontSize: 12
          },
          pageTextStyle: {
            color: '#75deef'
          },
          pageIconSize: 10,
          pageIconColor: '#75deef',
          itemWidth: 12,
          itemHeight: 7,
          right: "15%",
          left: '15%',
          selected: selected.value,
          data: legendData.value
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData.value,
            boundaryGap: false,
            axisLabel: {
              fontSize: 9,
              color: '#75deef',
              interval: 0,
              showMaxLabel: true,
              showMinLabel: true,
              formatter: (value, index) => {
                if (value.value == 1) {
                  if (index % 2 == 1) {
                    return value
                  }
                } else {
                  if ((index + 1) % 5 == 0) {
                    return value
                  }
                }
                if (index == 0) {
                  return value
                }
              }
            },
            axisLine: {
              lineStyle: {
                color: '#1a3c58'
              }
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
              inside: true
            }
          },
          {
            gridIndex: 1,
            type: 'category',
            data: xAxisData.value,
            axisLabel: {
              fontSize: 9,
              color: '#75deef',
              interval: 0,
              showMaxLabel: true,
              showMinLabel: true,
              formatter: (value, index) => {
                if (value.value == 1) {
                  if (index % 2 == 1) {
                    return value
                  }
                } else {
                  if ((index + 1) % 5 == 0) {
                    return value
                  }
                }
                if (index == 0) {
                  return value
                }
              }
            },
            axisLine: {

              lineStyle: {
                color: '#1a3c58'
              }
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
              inside: true
            }
          },

        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
            },
            min: 0,
            max: 300,
            splitNumber: 5,
            axisLabel: {
              showMaxLabel: false,
              fontSize: 9,
              color: '#75deef'
            },
            name: '(笔)',
            nameGap: -5,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
              padding: [0, 6, 0, 0]
            },
            axisLine: {
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              length: 3,
            }
          },

          {
            gridIndex: 1,
            type: 'value',
            min: 0,
            max: 300,
            interval: 50,
            splitLine: {
              show: false,
            },
            axisLabel: {
              showMaxLabel: false,
              fontSize: 9,
              color: '#75deef'
            },
            name: '(元)',
            nameGap: -5,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
              padding: [0, 6, 0, 0]
            },
            axisLine: {
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              length: 3,
            }
          },
        ],
        series: seriesData.value
      };
      if (!myChart.value) myChart.value = markRaw(echarts(bottom_1.value));
      myChart.value.clear();
      myChart.value.resize()
      myChart.value.setOption(option);
      myChart.value.on('legendselectchanged', (params) => {
        let arr = [];
        for (let i in params.selected) {
          if (params.selected[i] == true) {
            arr.push(params.selected[i])
          }
        }
        if (arr.length > 4) {
          this.$Modal.error({
            content: "<p>当前最多显示4个图例</p>"
          });
          myChart.value.dispatchAction({
            type: 'legendUnSelect',
            // 图例名称
            name: params.name
          })
        }

      });
    }
    onMounted(() => {
      handleSelect(value.value);
    })

    return {
      value,
      bottom_1,
      handleSelect,
      setChart,
    }
  }
}
</script>


<style scoped lang="less">
.lines {
  height: 100%;
  width: 100%;

  #bottom_1 {
    height: 100%;
    width: 100%;
  }

  position: relative;

  .switchButton {
    position: absolute;
    z-index: 5;
    right: 10px;
    top: 15px;
    border: 1px solid #028bff;
    border-radius: 5px;
    padding: 0;

    .active {
      background: #0454a1;
    }

    a {
      display: inline-block;
      color: #fff;
      padding: 1px 8px;
    }

  }
}
</style>
