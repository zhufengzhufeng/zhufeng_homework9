function Person() {
    this._event={};
}
Person.prototype.on = function (eventName,callBack) {
    if(this._event[eventName]){
            this._event[eventName].push(callBack);

    }else{
        this._event[eventName] = [callBack];
    }
}
Person.prototype.emit = function (eventName) {
     var args=Array.from(arguments).slice(1);
     this._event[eventName].forEach(item => {
         item.apply(this,args);
     })
}

/*作业--begin*/
Person.prototype.once = function (eventName,callBack) {
    //先绑定，绑定后执行，执行后删除这个事件，再次执行则不会被触发
    function temp() {
        this.removeEventListener(eventName, temp);
        callBack.apply(this, arguments);
    }
    this.on(eventName, temp);
}

/*作业--end*/

Person.prototype.removeEventListener = function (eventName,callBack) {
    if(this._event[eventName]){
        this._event[eventName] = this._event[eventName].filter(item => {
            return item != callBack;
        });
    }
}
function shopping(who,place) {
    console.log(who+" go shopping in "+place);
}
function singing(who,place) {
    console.log(who + " singing in " + place);
}
var person = new Person();
person.once("sunday",shopping);
//person.on("sunday",singing);
//person.removeEventListener("sunday",shopping);
person.emit("sunday","zhangsan","wangfujing");
person.emit("sunday","zhangsan","wangfujing");
person.emit("sunday","zhangsan","wangfujing");
person.emit("sunday","zhangsan","wangfujing");
person.emit("sunday","zhangsan","wangfujing");

