import { getFiled } from "../service/field";

//建表语句
export function create_sql(database_name:any,database_comment:any,fields:any){
   let sqls=[];
   let sql='';
   for(let i=0;i<fields.length;i++){
    sql=`${fields[i].field_name} ${fields[i].field_type}(255) not null ${i==0?'primary key':''}` 
    sqls.push(sql)
   }
   let table=`
   CREATE TABLE ${database_name}(
    ${sqls}
    ) COMMENT '${database_comment}'`
   return table
}
//插入语句的使用
// export function create_sql_one(database_name:any,fields:any,nums:any){
//     console.log(database_name,'输出数据库的名称') 
//     console.log(fields,'输出字段') 
//     let field:any=[]
//     for(let i=0;i<fields.length;i++){
//         field.push(fields[i].field_rule)
//     }
//     console.log(field,'输出规则字段') 
//     // const Mock = require("mockjs");
//     // var Random = Mock.Random;
//     // let obj = {
//     //     id: Random.id(), // 身份证号
//     //     GUID: Random.guid(),
//     //     name: Random.cname(),
//     //     age: Random.integer(20, 50),
//     //     asset: Random.float(200, 500000, 1, 6),
//     //     married: Random.boolean(),
//     //     birth: Random.datetime("yyyy-MM-dd HH:mm:ss"),  // 值是指定格式的日期字符串
//     //     // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
//     //     addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
//     //     email: Random.email("qq.com"),
//     //     word: Random.cword(2, 5),
//     //     string: Random.string(),
//     //     title: Random.ctitle(10, 15),
//     //     senetence: Random.csentence(15, 20),
//     //     paragraph: Random.cparagraph(),
//     // };
//     function generateInsertQuery(tableName:any, data:any) {
//         // let fields = [];
//         let values = [];
      
//         for (let key of field) {
//           // fields.push(key);
//           values.push("'" + data[key] + "'");
//           // console.log(key)
//         }
      
//         let query = "INSERT INTO " + tableName + " (" + field.join(", ") + ") VALUES (" + values.join(", ") + ")";
//         return query;
//       }
//       let result=generateInsertQuery(database_name,obj)
//       return result
// }

  