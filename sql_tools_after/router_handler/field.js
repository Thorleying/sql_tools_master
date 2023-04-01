const Mock = require("mockjs");
let Random = Mock.Random;
// 获取所有的字段规则
exports.postFieldRule = (req, res) => {
    let results=[]
    //字段名
    let field=req.query.field;
    //规则
    let rule=req.query.rule;
    //数据库表格名字
    let table_name=req.query.tableName;
    //数据数目
    let num=req.query.num;
    let result_field=[]
    let result_rule=[]
    // 处理之后的fields
    for(let i=0;i<field.length;i++){
        result_field.push(field[i].field_name)
    }
    for(let i=0;i<rule.length;i++){
        result_rule.push(rule[i].field_rule)
    }
    function getData(){
        let obj = {
          id: Random.id(), // 身份证号
          GUID: Random.guid(),
          name: Random.cname(),
          age: Random.integer(20, 50),
          asset: Random.float(200, 500000, 1, 6),
          married: Random.boolean(),
          birth: Random.datetime("yyyy-MM-dd HH:mm:ss"),  // 值是指定格式的日期字符串
          // birth2: new Date(Random.datetime("yyyy-MM-dd HH:mm:ss")),  // 值是 Date 类型
          addr: `${Random.province()}-${Random.city()}-${Random.county()}`,
          email: Random.email(),
          word: Random.cword(2, 5),
          ip: Random.ip(),
          time:Mock.mock('@datetime'),
          string: Random.string(),
          title: Random.ctitle(10, 15),
          senetence: Random.csentence(15, 20),
          paragraph: Random.cparagraph(),
        };
        return obj
    }
    function generateInsertQuery(tableName, data) {
        let values = [];
      
        for (let key of result_rule) {
          // fields.push(key);
          values.push("'" + data[key] + "'");
          // console.log(key)
        }
      
        let query = "INSERT INTO " + tableName + " (" + result_field.join(", ") + ") VALUES (" + values.join(", ") + ");";
      
        return query;
    }
    console.log(result_field,result_rule,'接受到了')
    for(let i=0;i<num;i++){
        let t=generateInsertQuery(table_name,getData())
        console.log(t)
        results.push(t)
        t="";
    }
    res.send({
        data:results
    })
}
//获取所有的模拟数据
exports.getMockData = (req, res) => {
    res.send({
        status: 0,
        msg: "所有模拟数据",
        data: mockData.mockData(10)
    })
}