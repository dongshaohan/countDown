(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.countDown = factory();
})(this, function() {

    function timer(delay) {
        this._queue = [];
        this.stop = false;
        this._createTimer(delay);
    };

    timer.prototype = {
        constructor: timer,
        _createTimer: function(delay) {
            var self = this;
            var first = true;
            (function() {
                var s = new Date();
                for (var i = 0; i < self._queue.length; i++) {
                    self._queue[i]();
                }
                if (!self.stop) {
                    var cost = new Date() - s;
                    delay = first ? delay : ((cost > delay) ? cost - delay : delay);
                    setTimeout(arguments.callee, delay);
                }
            })();
            first = false;
        },
        add: function(cb) {
            this._queue.push(cb);
            this.stop = false;
            return this._queue.length - 1;
        },
        remove: function(index) {
            this._queue.splice(index, 1);
            if (!this._queue.length) {
                this.stop = true;
            }
        }
    };

    function TimePool() {
        this._pool = {};
    };

    TimePool.prototype = {
        constructor: TimePool,
        getTimer: function(delayTime) {
            var t = this._pool[delayTime];
            return t ? t : (this._pool[delayTime] = new timer(delayTime));
        },
        removeTimer: function(delayTime) {
            if (this._pool[delayTime]) {
                delete this._pool[delayTime];
            }
        }
    };

    function countDown(config) {
        var defaultOptions = {
            unit: {
                day: true,
                hour: true,
                minute: true,
                second: true
            },
            fixNow: 3 * 1000,
            fixNowDate: false,
            delayTime: 1000,
            now: new Date().valueOf(),
            render: function(outstring) {
                console.log(outstring);
            },
            end: function() {
                console.log('the end!');
            },
            endTime: new Date().valueOf() + 5 * 1000 * 60
        };
        for (var i in defaultOptions) {
            if (defaultOptions.hasOwnProperty(i)) {
                this[i] = config[i] || defaultOptions[i];
            }
        }
        this.index = null;
        this.msInterval = new TimePool().getTimer(this.delayTime);
        this.init();
    };

    countDown.prototype = {
        constructor: countDown,
        init: function() {
            var self = this;
            if (this.fixNowDate) {
                var fix = new timer(this.fixNow);
                fix.add(function() {
                    self.getNowTime(function(now) {
                        self.now = now;
                    });
                });
            }
            this.index = self.msInterval.add(function() {
                self.now += self.delayTime;
                if (self.now >= self.endTime) {
                    self.msInterval.remove(self.index);
                    self.end();
                } else {
                    self.render(self.getOutString());
                }
            });
        },
        getOutString: function() {
            return _formatTime(this.endTime, this.now, this.unit);
        },
        getNowTime: function(cb) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 3) {
                    var now = xhr.getResponseHeader('Date');
                    cb(new Date(now).valueOf());
                }
            };
            xhr.send(null);
        },
        destroy: function () {
            this.msInterval.remove(this.index);
        }
    };

    function _cover(num) {
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : n;
    };

    function _formatTime(eMs, sMs, unit) {
        var _result = {};
        var timeMsMap = {
            day: 24 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000
        };
        var hasGone = 0;

        if (unit.day) {
            _result.day = _cover(Math.floor((eMs - sMs - hasGone) / timeMsMap.day));
            hasGone += _result.day * timeMsMap.day;
        }
        if (unit.hour) {
            _result.hour = _cover(Math.floor((eMs - sMs - hasGone) / timeMsMap.hour));
            hasGone += _result.hour * timeMsMap.hour;
        }
        if (unit.minute) {
            _result.minute = _cover(Math.floor((eMs - sMs - hasGone) / timeMsMap.minute));
            hasGone += _result.minute * timeMsMap.minute;
        }
        if (unit.second) {
            _result.second = _cover(Math.floor((eMs - sMs - hasGone) / timeMsMap.second));
            hasGone += _result.second * timeMsMap.second;
        }
        return _result;
    };

    return countDown;
});