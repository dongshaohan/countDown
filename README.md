## 使用方法

```javascript
new countDown({
    unit: {
        day: false,
        hour: true,
        minute: true,
        second: true
    },
    fixNow: 30 * 1000,
    now: store.currentTime * 1000,
    endTime: Date.now() + 44 * 60 * 60 * 1000,
    fixNowDate: true,
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