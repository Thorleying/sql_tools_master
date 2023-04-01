const Mock = require("mockjs");
var Random = Mock.Random;
let mock_array=[]
let mockJsData={
    mockData(num){
        for (var i = 0; i < num; i++) {
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
              email: Random.email("qq.com"),
              word: Random.cword(2, 5),
              string: Random.string(),
              title: Random.ctitle(10, 15),
              senetence: Random.csentence(15, 20),
              paragraph: Random.cparagraph(),
            };
            mock_array.push(obj)
          }
          return mock_array
    },
}

module.exports=mockJsData
