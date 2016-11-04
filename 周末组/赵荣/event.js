const EVENT_MONEY = '有钱';
const EVENT_ANGRY = '生气';
function Girl() {
    this._events = {}; //创建一个存放对应关系的盒子
}
Girl.prototype.on = function(eventName, callBack) {
    //制作一对多的对应关系
    //{'有钱', ['buyPack', 'buyCar']}
    //1.第一次获取对象时，没有对应的函数数组，创建数组并将函数放入
    //2.如果有数组，讲此方法翻入数组中
    if(!this._events[eventName]) {
        this._events[eventName] = [];
    }
    this._events[eventName].push(callBack);
};

/* 10.30作业 once实现 */
Girl.prototype.once = function(eventName, callBack) {
    var self = this;
    var onceCallBack = function tempCallBack() {
        var args = Array.prototype.slice.call(arguments);
        callBack.call(self, args);
        this.removeListener(eventName, tempCallBack);
    }
    this.on(eventName, onceCallBack);
    return this;
};

Girl.prototype.removeListener = function(eventName, callBack) {
    //数组的filter方法
    if(this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(function(item){
            return item !== callBack;
        });
    }
    return this;
};
Girl.prototype.emit = function(eventName) {
    //除了第一项的eventName都是需要传进后执行的参数,获取参数列表（不包括第一个）
    //var args = Array.prototype.slice.call(arguments, 1);
    var args = Array.from(arguments).slice(1);

    // var self = this;
    // this._events[eventName].forEach(function(item) {
    //     console.log(this);  //为什么是global?
    //     item.apply(that, args);
    // });

    this._events[eventName].forEach((item) => {
        item.apply(this, args);
    });
};

var girl = new Girl();
function buyPack(buyer, receiver) {
    console.log(buyer + '买LV包给' + receiver);
}
function buyCar(buyer, receiver) {
    console.log(buyer + '买bmw' + receiver);
}
function eat(a, b) {
    console.log("吃吃吃");
    console.log(a, b);
}

// girl.on(EVENT_MONEY, buyPack);
// girl.on(EVENT_MONEY, buyCar);
// girl.emit(EVENT_MONEY, '老公', '别人');

//生气就吃
girl.once(EVENT_ANGRY, eat);

//2次调用
girl.emit(EVENT_ANGRY, 'aaa', 'bbb');
girl.emit(EVENT_ANGRY, 'aaa', 'bbb');
