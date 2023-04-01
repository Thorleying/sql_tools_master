const express=require('express')
//创建一个路由对象
const router=express.Router();
const field_handler=require('../router_handler/field')
//传递所有的字段规则 获取模拟数据接口
router.post('/postFieldRule',field_handler.postFieldRule)
router.get('/getMockData',field_handler.getMockData)
module.exports = router