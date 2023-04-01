import axios from "../utils/axios"

export const postFiled=(fields:any,rules:any,num:any,tableName:any)=>{
    //传入 四个参数 一个字段名称 一个规则名 一个生成条数数目 一个表示表名
    return axios.request({
            url: '/postFieldRule',
            method: "POST",
            params:{
                field:fields,
                rule:rules,
                num:num,
                tableName:tableName
            }
        }
    )
}
//获取后端所有模拟数据
export const getFiled=()=>{
    return axios.request({
            url: '/getMockData',
            method: "GET",
        }
    )
}