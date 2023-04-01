import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:4512/api' : 'http://localhost:4512/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.response.use((res:any) => {
    console.log(res.status,'输出状态吗')
    if (res.status===200){
        return res
    }
    alert('网络请求失败')
})
export default axios