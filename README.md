## 使用方法

```javascript
new countDown({
    unit: {
        day: false,
        hour: true,
        minute: true,
        second: true
    }, // 日期开关
    delayTime: 1000, // 倒计时间隔
    fixNox: 10 * 1000, // 同步服务器时间 默认每隔10s同步一次
    fixNowDate: false, // 同步服务器时间开关
    now: store.currentTime * 1000, // 开始时间 毫秒
    endTime: Date.now() + 44 * 60 * 60 * 1000, // 结束时间 毫秒
    render: function (outstring) {
        console.log (outstring);
        $('#hour').text( outstring.hour );
        $('#minute').text( outstring.minute );
        $('#second').text( outstring.second );
    },
    end: function () {
        console.log('the end!');
    }
});
```