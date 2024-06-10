<template>
  <div class="main">
    <!--用viewbox进行了一个缩放-->
    <svg class="guideLine" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 783 500">
      <!--gif图片-->
      <image x="5%" y="20" :xlink:href="$images.center" width="90%" height="100%"/>

      <!--文本框的外部-->
      <image v-if='!status' x="250" y="320" :style="{opacity: number}" :xlink:href="$images.normal_bg" width="250"
             height="170"/>
      <image v-else id="textBox_1" x="220" y="110" :xlink:href="$images.sensitive_bg" width="300" height="170"/>


      <g v-for="(item, index) in swiperData" :key="item.title">
        <image class="bg_img" :x="item.image.x" :y="item.image.y"
               :xlink:href="item.status?$images.sensitive_title:$images.normal_title" width="130"
               height="50"/>
        <foreignObject class="title_1" @mouseenter="onmouseenter" @mouseleave="onmouseleave" :x="item.pos.x"
                       :y="item.pos.y" :id="'title_'+ (index + 1)" width="100" height="40">
          <div class="title-text-box" xmlns="http://www.w3.org/1999/xhtml">
            <p :style="{color:item.status?'#FFDBDB':''}">
              <span class="titleText">{{ item.title }}</span>
              <Rate :show-text="false" disabled v-model="item.rate"></Rate>
            </p>
          </div>
        </foreignObject>
        <!--mouseenter后显示 mouseleave后隐藏-->
        <foreignObject class="text" x="250" y="320" ref="textBox" width="250" height="170">
          <div class="text-box" xmlns="http://www.w3.org/1999/xhtml">
            <div class="promptBox">
              <div class="promptTitle">{{ item.title }}</div>
              <div class="psychologyContent">
                对当前模块的一些描述...
              </div>
            </div>
          </div>
        </foreignObject>
        <!--动画路径-->
        <path :id="'line_'+ (index + 1)" :class='item.path.className' :d="item.path.d" stroke="#AFE5FB"
              stroke-width="2"
              fill="none"/>
      </g>

    </svg>
  </div>
</template>

<script>
import {onUnmounted, onMounted, ref, getCurrentInstance, watch} from 'vue';

export default {
  name: 'center',
  setup(props) {
    const $images = getCurrentInstance().appContext.config.globalProperties.$images;
    //循环动画
    const timer1 = ref(null);
    const status = ref(false);
    //循环/不循环动画
    const timer = ref(null);
    const rid = ref(null);
    const index = ref(0);
    const number = ref(0);
    const length = ref(0);
    const frames = ref(0);
    const isIE = ref(false);
    const swiperData = ref([
      {
        image: {
          x: 85,
          y: 354
        },
        status: false,
        rate: 0,
        title: '标题一',
        pos: {
          x: 102,
          y: 364
        },
        path: {
          d: 'M150,402 L150,432 250,432',
          className: 'swap1'
        }
      },
      {
        image: {
          x: 58,
          y: 224
        },
        status: false,
        rate: 0,
        title: '标题二',
        pos: {
          x: 76,
          y: 232
        },
        path: {
          d: 'M125,272 L125,337 250,337',
          className: 'swap2'
        }
      },
      {
        image: {
          x: 87,
          y: 110
        },
        status: false,
        rate: 0,
        title: '标题三',
        pos: {
          x: 105,
          y: 118
        },
        path: {
          d: 'M207,135 L260,135 260,322',
          className: 'swap3'
        }
      },
      {
        image: {
          x: 310,
          y: 40
        },
        status: false,
        rate: 0,
        title: '标题四',
        pos: {
          x: 328,
          y: 49
        },
        path: {
          d: 'M319,66 L279,66 279,321',
          className: 'swap4'
        }
      },
      {
        image: {
          x: 522,
          y: 110
        },
        status: false,
        rate: 0,
        title: '标题五',
        pos: {
          x: 538,
          y: 118
        },
        path: {
          d: 'M538,135 L485,135 485,322',
          className: 'swap3'
        }
      },
      {
        image: {
          x: 560,
          y: 224
        },
        status: false,
        rate: 0,
        title: '标题六',
        pos: {
          x: 578,
          y: 230
        },
        path: {
          d: 'M625,272 L625,337 500,337',
          className: 'swap2'
        }
      },
      {
        image: {
          x: 538,
          y: 354
        },
        status: true,
        rate: 0,
        title: '标题七',
        pos: {
          x: 555,
          y: 364
        },
        path: {
          d: 'M600,402 L600,432 500,432',
          className: 'swap1'
        }
      }
    ]);
    const textBox = ref(null);
    //在组件创建时判断浏览器是否支持SVG的foreignObject元素
    if (!window.SVGForeignObjectElement) {
      isIE.value = true;
    }

    // mouseenter 当鼠标悬停在某个标题上时，触发此方法。
    const onmouseenter = function (e) {
      //隐藏所有文本框的内容，将它们的透明度设置为0。
      document.querySelectorAll('.text').forEach(item => item.style.opacity = 0);
      //重置所有路径动画的偏移量，分别设置为初始值
      document.querySelectorAll('.swap1').forEach(item => item.style.strokeDashoffset = 130);
      document.querySelectorAll('.swap2').forEach(item => item.style.strokeDashoffset = 190);
      document.querySelectorAll('.swap3').forEach(item => item.style.strokeDashoffset = 240);
      document.querySelectorAll('.swap4').forEach(item => item.style.strokeDashoffset = 295);

      //取消之前的动画帧，清除定时器，确保没有正在进行的动画。
      cancelAnimationFrame(rid.value);
      rid.value = null;
      clearTimeout(timer.value)
      timer.value = null;
      //根据鼠标悬停的元素的ID提取出对应的索引值，启动动画并传递true，表示这是一次鼠标悬停事件。
      animation(Number(e.currentTarget.id.substr(e.currentTarget.id.length - 1, 1)), true);
    }
    //mouseleave 当鼠标离开标题时，触发此方法。
    const onmouseleave = function () {
      //继续启动动画，并传递false，表示这是一个非鼠标悬停事件（即恢复默认动画循环）。
      animation(1, false);
    }

    //实现路径的动画效果，通过requestAnimationFrame实现平滑的动画。
    const frame = function () {
      //取消当前的动画帧，然后请求下一个动画帧。
      cancelAnimationFrame(rid.value);
      rid.value = null;
      rid.value = requestAnimationFrame(frame);
      //根据当前的索引获取对应的路径元素。
      let line = document.querySelector("#line_" + index.value);
      //更新路径的偏移量
      line.style.strokeDashoffset = frames.value;
      // 测试api
      // line.getPointAtLength(length.value - frames.value);
      // line.getPointAtLength((length.value - frames.value + 2) % length.value);

      //如果当前索引大于1，重置前一个路径的偏移量，并隐藏对应的文本框。
      if (index.value > 1) {
        line = document.querySelector("#line_" + (index.value - 1));
        textBox.value[index.value - 2].style.opacity = 0;
        line.style.strokeDashoffset = line.style.strokeDasharray;
      }
      //如果当前索引为1，重置所有后续路径的偏移量，并隐藏它们的文本框。
      if (index.value === 1) {
        for (let i = 2; i < 8; i++) {
          line = document.querySelector("#line_" + i);
          textBox.value[i - 1].style.opacity = 0;
          //strokeDashoffset:虚线图案的起始位置偏移量
          //strokeDasharray:表示线段和间隙的长度。可以指定多个值
          line.style.strokeDashoffset = line.style.strokeDasharray;
        }
      }
      //更新当前动画的透明度和偏移量。  this.frames 表示路径的虚线偏移量（stroke-dashoffset）。 每次减少 5 个单位，表示路径虚线的偏移量逐渐减少，使路径逐渐显示出来。
      textBox.value[index.value - 1].style.opacity = number.value;
      number.value += 5 / length.value;
      frames.value -= 5;


      //当偏移量达到阈值时，停止动画。
      if (frames.value <= -5) {
        cancelAnimationFrame(rid.value);
        rid.value = null;
      }
    }
    const animation = function (i, boolean) {
      //清除之前的定时器和动画帧，确保没有正在进行的动画。
      clearTimeout(timer.value);
      cancelAnimationFrame(rid.value);
      rid.value = null;
      timer.value = null;
      //当索引值大于7时，重置为1。
      if (i > 7) {
        i = 1;
      }

      //重置所有路径的状态，将它们设置为未激活状态，然后激活当前索引对应的路径。
      swiperData.value.forEach(item => item.status = false);
      swiperData.value[i - 1].status = true;

      //根据当前索引获取对应的路径元素，计算路径的总长度，并设置动画的初始值。
      const line = document.querySelector("#line_" + i);
      length.value = line.getTotalLength();
      // console.log(this.length)
      line.style.strokeDasharray = length.value;
      line.style.strokeDashoffset = length.value;
      frames.value = length.value;
      index.value = i;
      number.value = 0;

      //启动动画帧。
      frame();
      //如果布尔值为false，表示这是一个默认循环动画，设置定时器在5秒后启动下一个动画
      if (!boolean) {
        clearTimeout(timer.value);
        timer.value = null;
        timer.value = setTimeout(() => {
          animation(i + 1, boolean);
        }, 5000);
      }
    }

    // 中心图 初始化图表的显示，并设置定时器来控制动画循环播放。
    const setChart = function () {
      //清除之前的定时器和动画帧，确保没有正在进行的动画。
      clearTimeout(timer1.value);
      clearTimeout(timer.value);
      cancelAnimationFrame(rid.value);
      frames.value = 0;
      rid.value = null;
      timer.value = null;
      timer1.value = null
      //设置定时器在5秒后启动动画，并传递false表示默认循环动画。
      timer1.value = setTimeout(() => {
        animation(1, false);
      }, 5000);
    }
    onMounted(() => {
      //调用setChart方法，初始化图表并启动动画。
      setChart();
    })
    //在组件销毁前清除所有定时器和动画，并重置状态。
    onUnmounted(() => {
      //隐藏所有文本框内容，重置所有路径的偏移量。
      document.querySelectorAll('.text').forEach(item => item.style.opacity = 0);
      document.querySelectorAll('.swap1').forEach(item => item.style.strokeDashoffset = 130);
      document.querySelectorAll('.swap2').forEach(item => item.style.strokeDashoffset = 190);
      document.querySelectorAll('.swap3').forEach(item => item.style.strokeDashoffset = 240);
      document.querySelectorAll('.swap4').forEach(item => item.style.strokeDashoffset = 295);

      //取消当前的动画帧，清除定时器。
      cancelAnimationFrame(rid.value);
      rid.value = null;
      clearTimeout(timer.value)
      clearTimeout(timer1.value)
      timer.value = null;
      timer1.value = null;
      //将所有路径的状态重置为未激活状态。
      swiperData.value.forEach(item => item.status = false);
    })
    return {
      timer1,
      status,
      timer,
      rid,
      index,
      number,
      length,
      frames,
      isIE,
      swiperData,
      textBox,
      onmouseenter,
      onmouseleave,
      setChart,
    }

  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;

  .guideLine {
    width: 100%;
    height: 100%;

    #textBox_1 {
      opacity: 0;
    }

    .title_1 {
      font-size: 15px;
      cursor: pointer;

      .title-text-box {
        background: rgba(0, 0, 0, 0);
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;
        height: 100%;

        p {
          width: 100%;
          background: rgba(0, 0, 0, 0);
          color: #A0E8FF;
          font-size: 15px;
          text-align: center;

          .titleText {
            margin-left: -5px;
            font-size: 15px;
            display: block;
          }

          /deep/ .ivu-rate {
            font-size: 14px;

            .ivu-rate-star {
              margin-right: 6px;
            }
          }

        }
      }
    }

    .text {
      opacity: 0;
      color: #fff;
      font-size: 15px;
      text-align: center;

      .text-box {
        background: rgba(0, 0, 0, 0);
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;

        .promptBox {
          width: 100%;
          height: 100%;
          padding: 10px 20px;

          .promptTitle {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          p {
            background: rgba(0, 0, 0, 0);
            color: #A0E8FF;
            font-size: 16px;
            text-align: left;
          }
        }

        .psychologyContent {
          color: #AFE5FB;
          font-size: 16px;
          text-align: left;

          div {
            line-height: 2em;

            span {
              &:first-child {
                color: #FED723;
                cursor: pointer;
              }
            }
          }
        }

      }
    }

    .swap1 {
      stroke-dasharray: 130;
      stroke-dashoffset: 130;
    }

    .swap2 {
      stroke-dasharray: 190;
      stroke-dashoffset: 190;
    }

    .swap3 {
      stroke-dasharray: 240;
      stroke-dashoffset: 240;
    }

    .swap4 {
      stroke-dasharray: 295;
      stroke-dashoffset: 295;
    }

    .circle-point {
      &:hover {
        fill: #000;
      }
    }

    // .swap4{
    // stroke-dasharray: 110;
    // stroke-dashoffset: 110;
    // }
  }
}
</style>
