# BigScreen
从vue2.0到vue3.0做了改造，遇到了很多问题。

比如,echarts和vue3.0的响应式冲突导致hover失效、路由配置等

失效是echarts全局引入，只用传递dom就行。然后图表格hover失效了

```js
if (!myChart.value) myChart.value = markRaw(echarts(area.value));
myChart.value.clear();
myChart.value.resize()
myChart.value.setOption(option);
```

各种实例，从echarts官方提供的实例中引用的。

做了个模拟，使用vue3.0的watch,各个echart均被监听到，根据日期的改变去reset(),

```js
// 监听selectRangeDate数据的变化
watch(() => props.selectRangeDate, () => {
  for (let i = 0; i < chartRefs.length; i++) {
    const chart = chartRefs[i].value
    if (chart) {
      chart.setChart();
    }
  }
});
```

中间的动画使用了svg路径设计

![image.png](https://s2.loli.net/2024/06/03/WGrgFxq9O1R5NTf.png)

中间路径动画抽象简单逻辑：

```js
<svg style="width: 200px; height: 200px;border: 1px solid red" xmlns="http://www.w3.org/2000/svg" viewBox="150 400 100 100">
    <!-- 定义路径 -->
    <path id="path" d="M150,402 L150,432 250,432" stroke="#AFE5FB" stroke-width="2" fill="none"/>
</svg>


 let dom = document.getElementById('path');
    let length = dom.getTotalLength();
    let speed = 1;

    /*
    * 隐藏路径*/
    function init() {
        dom.style.strokeDasharray = length;
        dom.style.strokeDashoffset = length;
    }

    //逐渐向右偏移
    function animate() {
        if (parseInt(dom.style.strokeDashoffset) !== 0) {
            dom.style.strokeDashoffset -= speed;
            requestAnimationFrame(animate);
        }
    }

    init()
    animate();
```

