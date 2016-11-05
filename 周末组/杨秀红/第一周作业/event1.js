/**
 * Created by Administrator on 2016/11/3.
 */

function Girl() {
    this._events = {}; //创建一个存放对应关系的盒子
}
//once方法
Girl.prototype.once=function(eventName,callback){
    //先绑定，绑定后执行，执行后删除这个事件，在次执行则不会被触发
    function onceCallback(){
        callback.apply(this, arguments);
        this.removeListener(eventName, onceCallback);
    }
    this.on(eventName,onceCallback);
}

Girl.prototype.on = function (eventName,callback) {
    //制作一对多的对应关系
    //{'有钱':['buyCar','buyPack']}
    //1.第一次获取对象时没有对应的函数数组，创建数组并将函数放入
    //2.如果有数组，将此次方法放到数组中
    if(this._events[eventName]){
        //找到同名的将方法push对应的盒子中
        this._events[eventName].push(callback);
    }else{
        //第一次创建一个盒子用来存放第一次的一对的关系
        this._events[eventName] = [callback];
    }
};
Girl.prototype.emit = function (eventName) {
    //拿到对应的方法的数组依次执行
    //除了第一项的eventName都是需要传进后执行的参数,获取参数列表（不包括第一个）
    //var args = [].slice.call(arguments,1);
    var args = Array.from(arguments).slice(1); //转化成数组在截取第一项后面的所有参数
    this._events[eventName].forEach((item)=>{
        item.apply(this,args);//箭头函数中是没有this指向，所以this指代的是上级this
    });
};
Girl.prototype.removeListener = function (eventName,callback) {
    //数组的filter方法
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return item!=callback; //为false则删除，为true则留下
        });
    }
};
var girl = new Girl();
function buyPack(who,other) {console.log(who+'买lv包'+other);}
//function buyCar(who,other) {console.log(who+'买bmw'+other);}
girl.once('有钱',buyPack); //先绑定，绑定后执行，执行后删除这个事件，在次执行则不会被触发
//girl.on('有钱',buyCar);
//girl.removeListener('有钱',buyCar);//移除方法
girl.emit('有钱','你','我');//当触发有钱时执行buyPack和buyCar


