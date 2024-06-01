import {createRouter, createWebHistory} from 'vue-router';
import home from '@/views/home.vue'; // 确保文件扩展名为 .vue

const routes = [
    {
        path: '/',
        redirect: '/page1'

    },
    // 这里的路由改造绝对是个坑，vue2.0 path:''就可以默认跳转page1,这里得加斜杠
    {
        path: '/',
        name: 'home',
        component: home,
        children: [
            {
                path: '/page1',
                name: 'page1',
                component: () => import('@/views/page1.vue') // 确保文件扩展名为 .vue
            },
            {
                path:'/test',
                name:'test',
                component:()=>import('@/views/components/test.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(), // 或者使用 createWebHashHistory() 如果你想要 hash 模式
    routes
});

export default router;
