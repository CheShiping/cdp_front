// 使用 Mock
import Mock from 'mockjs'
var data = Mock.mock({
  'numberList|2-5': [
  {
    'id|+1': 1,
    'name|1-3': '忆清',
    'phone|11': '8',
    'age|1-60': 1,
    'salary|6000-8000.1-3': 0,
    'status|1': true,
    'open|2-4': true,
    'order|2': {id: 1, name: '订单1', price: 89.3},
    'order2|2-4': {id: 1, name: '洗发水', price: 84.9},
    'idCard': /\d{15}|\d{18}/
  }
  ]

})
// 输出结果
console.log(JSON.stringify(data, null, 4))