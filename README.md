# BigScreen
从vue2.0到vue3.0做了改造，遇到了很多问题。

比如,echarts和vue3.0的响应式冲突导致hover失效、路由配置等

各种实例，从echarts官方提供的实例中引用的。

做了个模拟，使用vue3.0的watch,各个echart均被监听到，根据日期的改变去reset(),

中间的动画使用了svg路径设计

![image.png](https://s2.loli.net/2024/06/03/WGrgFxq9O1R5NTf.png)
