import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
// iView框架
import * as iView from 'view-ui-plus'; // 需要使用 Vue 3 兼容的版本
//tile、ange1、angle2、ange3样式
import './assets/less/index.less';
//echarts框架
import * as echarts from 'echarts';
//图片合计
import img from './lib/img'

import {debounce} from './lib/utils';

const app = createApp(App);

app.config.globalProperties.$echarts = function (el) {
    return echarts.init(el, null, {renderer: 'svg'});
}
app.config.globalProperties.$debounce = debounce;
app.config.globalProperties.$images = img;

app.use(router);
app.use(iView); // 确保使用 Vue 3 兼容版本的 ViewUIPlus (iView)


app.mount('#app');
