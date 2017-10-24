## 使用方法

```javascript
new countDown({
    unit: {
        day: false,
        hour: true,
        minute: true,
        second: true
    }, // 日期开关
    fixServer: 10 * 1000, // 同步服务器时间 默认每隔10s同步一次
    fixServerDate: false, // 同步服务器时间开关 与 修正客户端时间开关 两者同时存在其一
    fixNox: 10 * 1000, // 修正客户端时间 默认每隔10s同步一次
    fixNowDate: false, // 修正客户端时间开关
    now: store.currentTime * 1000, // 开始时间 毫秒
    endTime: Date.now() + 44 * 60 * 60 * 1000, // 结束时间 毫秒
    render: function (outstring) {
        console.log (outstring);
        $('#hour').text( outstring.h );
        $('#minute').text( outstring.m );
        $('#second').text( outstring.s );
    },
    end: function () {
        console.log('the end!');
    }
});
```