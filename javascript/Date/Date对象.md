## Date 日期对象

### 1、Date()是构造函数

- 不传参，返回当前日期和时间 new Date()
- 传时间字符串，将改时间转成标准时间 new Date('2021-07-02 23:23:23')
- new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
  new Date(2021,2,12,03,56,34)
- 传时间戳，将改时间转成标准时间

### 2、获取时间戳

- Date.now() 返回时间戳

- Date.parse() 传一个表示日期的字符串，获取到该日期的事件戳
  Date.parse('2021-11-11 11:11:11') // 1636600271000
- getTime() 表示从 1970 年 1 月 1 日 00:00:00 UTC 到给定日期之间经过的毫秒数。

- setTime() 将 Date 对象设置为自 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数表示的时间。

  ```javascript
  const event1 = new Date("July 1, 1999");
  const event2 = new Date();
  event2.setTime(event1.getTime());
  //Thu Jul 01 1999 00:00:00 GMT+0800 (中国标准时间)
  ```

### 3、获取或设置某个具体的时间点

1. 年

   ```javascript
   getFullYear();

   setFullYear(); //传参 （年，月，日）3 种方式

   const event = new Date("August 19, 1975 23:15:30");
   event.setFullYear(2020, 6, 7);
   console.log(event.getFullYear(), event); // 2020 Tue Jul 07 2020 23:15:30 GMT+0800 (中国标准时间)
   ```

2. 月

   ```javascript
   getMonth() 0 是一月

   setMonth() //传参 （月，日）2 种方式

   const event = new Date('August 19, 1975 23:15:30');
   event.setMonth(3,21); // Mon Apr 21 1975 23:15:30 GMT+0800 (中国标准时间)
   ```

3. 日

   ```javascript
   getDate();

   setDate();

   const day = new Date(2020, 6, 7); //2020-07-07 6 表示 7 月
   day.setDate(24); // 2020-07-24
   day.setDate(32); // 2020-08-01
   ```

4. 周

   ```javascript
   getDay() 0 是周日

   // 没有 setDay()方法
   ```

5. 时

   ```javascript
   getHours()
   
   setHours() //传参 （时，分，秒，毫秒） 4 种方式
   
   event.setHours(20, 21, 22); //Tue Aug 19 1975 20:21:22 GMT+0800 (中国标准时间)
   ```
   
6. 分

   ```javascript
   getMinutes()

   setMinutes() //传参 （分，秒，毫秒）3 种方式
   ```

7. 秒

   ```javascript
   getSeconds()

   setSeconds() //传参 （秒，毫秒）2 种方式
   ```

8. 毫秒

   ```javascript
   getMilliseconds()

   setMilliseconds() 设置毫秒数（0-999）
   ```


### 4、转换时间格式

1. toString()

   ```javascript
   返回格式，如"Thu Jul 22 2021 15:54:43 GMT+0800 (中国标准时间)"
   
   // 星期 月 日 年 时分秒
   
   const event = new Date();
   console.log(event.toString());
   
   //"Thu Jul 22 2021 15:54:43 GMT+0800 (中国标准时间)"
   ```
   
2. toDateString()

   ```javascript
   返回格式，如 Thu Jul 22 2021
   
   星期 三位英文
   
   月 三位英文
   
   日 两位数字 不够在左侧填 0
   
   年 4 位数字 不够左侧填 0
   
   const event = new Date();
   console.log(event.toDateString());
   
   // "Thu Jul 22 2021"
   ```
   
3. toISOString()

   ```javascript
   返回一个字符串，其长度始终为 24 或 27 个字符（YYYY-MM-DDTHH:mm:ss.sssZ 或 ±YYYYYY-MM-DDTHH:mm:ss。 sssZ，分别）。时区始终为零 UTC 偏移量，如后缀“Z”所示。
   
   **返回格式 ： YYYY-MM-DDTHH:mm:ss.sssZ
   即 年月日 T 时分秒.毫秒 Z
   "2011-10-05T14:48:00.700Z"**
   
   const event = new Date('05 October 2011 14:48 UTC');
   event.setMilliseconds(700)
   console.log(event.toISOString());
   
   // "2011-10-05T14:48:00.700Z"
   ```
   
4. toJSON()

   ```javascript
   返回 Date 对象的字符串表示形式。

   // 返回格式与 toISOString()方法一样
   ```

5. toLocalDateString()

   ```javascript
   根据特定于语言的约定表示给定 Date 实例的日期部分的字符串。
   
   语法： toLocaleDateString()
   
   toLocaleDateString(locales)
   
   toLocaleDateString(locales, options)
   
   例子：
   
   const now = new Date();
   const s = now.toLocaleDateString();
   
   // 7/22/2021
   const s1 = now.toLocaleDateString("en-ch");
   
   // 22/07/2021
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   const s2 = now.toLocaleDateString("en-ch",options);
   
   // Thursday, 22 July 2021
   ```
   
   

<font color="red">注意：**1、toDateString 与 toString()方法的区别：toString()方法返回的时间格式比 toDateString()多时分秒  2、toJSON()返回格式与 toISOString()方法一样** </font>
