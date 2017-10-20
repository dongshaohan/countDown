## 使用方法

```javascript
new countDown({
	// 日期开关
    unit: {
        day: false,
        hour: true,
        minute: true,
        second: true
    },
    fixNow: 30 * 1000, // 每隔30s同步一次
    now: store.currentTime * 1000, // 开始时间毫秒
    endTime: Date.now() + 44 * 60 * 60 * 1000, // 结束时间 毫秒
    fixNowDate: true, // 同步服务器时间
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