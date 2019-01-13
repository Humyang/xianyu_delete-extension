chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    // alert(12333)
    clock_.start(info.t)
  });
});



var Local = {
    setItem: function(endtime) {
        localStorage.setItem("endtime",endtime )
    },
    getItem: function() {
        return localStorage.getItem("endtime")
    }
}
var savedTime = Local.getItem()

var clock_ = new Clock('5m', function(remain) {
    var rt = this.toHMS(remain)
    var Msg = {
        "type": "fromBG_perS",
        "rt": rt
    };
    chrome.runtime.connect().postMessage(Msg);
})


clock_.onEnd = function(){
    var Msg = {
        "type": "fromBG_End"
    };
    chrome.runtime.connect().postMessage(Msg);
    var opt = {
        type: "basic",
        title: "时间到了",
        message: "继续工作噢",
        iconUrl: "icon.png"
    }
    chrome.notifications.create(opt);
}
// clock_.start()
function Clock(time, callback) {
    this.time = time
    this.timeid = 0
    var self = this
    this.toHMS = function(value) {
        var remainHour = value - (value % 3600000)
        var remainMinute = value - remainHour - ((value - remainHour) % 60000)
        var remainSecond = value - remainHour - remainMinute

        return [remainHour / 3600000, remainMinute / 60000, Math.round(remainSecond / 1000)]
    }
    this.addSecond = function(value) {
        return (new Date()).getTime() + this.second(value)
    }
    this.addMinute = function(value) {
        return (new Date()).getTime() + this.minute(value)
    }
    this.addHours = function(value) {
        return (new Date()).getTime() + this.hour(value)
    }
    this.second = function(value) {
        return value * 1000
    }
    this.minute = function(value) {
        return value * 60 * 1000
    }
    this.hour = function(value) {
        return value * 60 * 60 * 1000
    }
    this.start = function(newtime) {
        this.time = newtime
        var endTime = ''
        var valueUnit = 0
        switch (this.time[this.time.length - 1]) {
            case 'm':
                valueUnit = (this.time.substr(0, this.time.length - 1)) * 1
                endTime = this.addMinute(valueUnit)
                break;
            case 's':
                valueUnit = (this.time.substr(0, this.time.length - 1)) * 1
                endTime = this.addSecond(valueUnit)
                break;
            case 'h':
                valueUnit = (this.time.substr(0, this.time.length - 1)) * 1
                endTime = this.addHours(valueUnit)
                break;
            default:
                console.log('未知的格式')
                break;
        }
        var self = this
        // 获取当前时间
        this.timer(endTime)
        // 倒计时
    }
    this.timer = function(endTime) {

        var current = (new Date()).getTime()
        if(current > endTime){
          return
        }
        self.timeid = setInterval(function() {
            if (current >= endTime) {
                self.clear()
                self.onEnd()
            } else {
                current += self.second(1)
                callback.call(self, endTime - current)
            }

        }, 1000)

        Local.setItem(endTime)
    }
    this.onEnd = function(){

    }
    this.setTime = function(time) {
        this.time = time
    }
    this.pause = function() {

    }
    this.clear = function() {
        clearInterval(self.timeid);
    }
    // init()
}