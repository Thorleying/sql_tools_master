import {defineStore} from 'pinia'
export const mainStore=defineStore('main',{
    state:()=>{
        return{
            msg:'hello world',
            //存储字段的所有消息
            fileds:[],
            //是否点击了保存字段
            isKeepField:false
        }
    }
})