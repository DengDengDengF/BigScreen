<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

import {ref, onMounted, onBeforeUnmount} from 'vue';

export default {
  name: 'App',
  setup() {
    const resizeFn = ref(null);

    //整个窗口元素缩放
    const handleResize = () => {
      const documentWidth = document.body.offsetWidth;
      const ratio = documentWidth / 1920;
      if (documentWidth > 1920) {
        document.body.style.transform = `scale(${ratio}, ${ratio})`;
      }
    };
    //窗口防抖
    const debounce = (func, wait) => {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    onMounted(() => {
      //窗口缩放
      handleResize();
      //窗口防抖
      resizeFn.value = debounce(handleResize, 200);
      //添加订阅
      window.addEventListener('resize', resizeFn.value);
    });

    onBeforeUnmount(() => {
      if (resizeFn.value) {
        window.removeEventListener('resize', resizeFn.value);
      }
    });

    return {};
  }
};
</script>

<style lang="less">
html, body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

html {
  font-size: 20px;
}

body {
  transform-origin: left top;
  background-size: 100% 100%;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
