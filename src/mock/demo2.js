import { log } from "console";
import Mock from "mockjs";

const data = Mock.mock({
  'empList|3': [{
    'id|+1': 1,
    'name': '@cname(2,4)',
    'price': '@float',
    'status': '@boolean',
    'birthday': '@date', 
    'entryDate': '@date("yyyy/MM/dd")',
    'createDate': '@datetime',
    'updateDate': '@datetime("yyyy/MM/dd HH:mm:ss")',
    'pic': '@image',
    'title': '@ctitle(3,6)',
    'content': '@csentence(8,10)',
    'first': '@cfirst',
    'last': '@clast',
    'url': '@url("http", "cdp.edu.cn")',
    'domain': '@domain',
    'ip': '@ip',
    'email': '@email',
    'area': '@region',
    'address': '@county(true)',
    'zipCode': '@zip'
  }]
})

log(JSON.stringify(data, null, 2))