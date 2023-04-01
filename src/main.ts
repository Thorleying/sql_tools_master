import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
//引入pinia
import {createPinia} from 'pinia'
import hl from 'highlight.js' // 导入代码高亮文件
import 'highlight.js/styles/a11y-dark.css' // 导入代码高亮样式
const pinia=createPinia()
const app=createApp(App)
app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: any) => {
        hl.highlightBlock(block)
    })
})
app.use(Antd).use(pinia).use(router).mount('#app')
