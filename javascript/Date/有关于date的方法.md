### Date 日期对象

1. Date()是构造函数

   - 不传参，返回当前日期和时间 new Date()
   - 传时间字符串，将改时间转成标准时间 new Date('2021-07-02 23:23:23')
   - new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
     new Date(2021,2,12,03,56,34)
   - 传时间戳，将改时间转成标准时间

2. Date.now() 返回时间戳
3. Date.parse() 传一个表示日期的字符串，获取到该日期的事件戳
   Date.parse('2021-11-11 11:11:11') // 1636600271000
4. getDay() 根据具体时间，返回周几，0 是周日
5. getDate() 根据具体时间，返回月份中第几天 /setDate()
6. getFullYear() 根据具体时间，返回年份 /setFullYear()
7. getHours() 根据具体时间，返回小时数 /setHours()
8. getMilliseconds() 根据具体时间，返回毫秒数 /setMilliseconds() 设置毫秒数（0-999）
9. getMinutes() 根据具体时间，返回分钟数 /setMinutes()
10. getSeconds() 根据具体时间，返回秒数 /setSeconds()
11. getTime()/setTime()
12. toDateString()
13. toISOString()
14. toJSON()
15. toLocalDateString()
