/**
 * Created by Administrator on 2016/11/3.
 */

function Girl() {
    this._events = {}; //����һ����Ŷ�Ӧ��ϵ�ĺ���
}
//once����
Girl.prototype.once=function(eventName,callback){
    //�Ȱ󶨣��󶨺�ִ�У�ִ�к�ɾ������¼����ڴ�ִ���򲻻ᱻ����
    function onceCallback(){
        callback.apply(this, arguments);
        this.removeListener(eventName, onceCallback);
    }
    this.on(eventName,onceCallback);
}

Girl.prototype.on = function (eventName,callback) {
    //����һ�Զ�Ķ�Ӧ��ϵ
    //{'��Ǯ':['buyCar','buyPack']}
    //1.��һ�λ�ȡ����ʱû�ж�Ӧ�ĺ������飬�������鲢����������
    //2.��������飬���˴η����ŵ�������
    if(this._events[eventName]){
        //�ҵ�ͬ���Ľ�����push��Ӧ�ĺ�����
        this._events[eventName].push(callback);
    }else{
        //��һ�δ���һ������������ŵ�һ�ε�һ�ԵĹ�ϵ
        this._events[eventName] = [callback];
    }
};
Girl.prototype.emit = function (eventName) {
    //�õ���Ӧ�ķ�������������ִ��
    //���˵�һ���eventName������Ҫ������ִ�еĲ���,��ȡ�����б���������һ����
    //var args = [].slice.call(arguments,1);
    var args = Array.from(arguments).slice(1); //ת���������ڽ�ȡ��һ���������в���
    this._events[eventName].forEach((item)=>{
        item.apply(this,args);//��ͷ��������û��thisָ������thisָ�������ϼ�this
    });
};
Girl.prototype.removeListener = function (eventName,callback) {
    //�����filter����
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(function (item) {
            return item!=callback; //Ϊfalse��ɾ����Ϊtrue������
        });
    }
};
var girl = new Girl();
function buyPack(who,other) {console.log(who+'��lv��'+other);}
//function buyCar(who,other) {console.log(who+'��bmw'+other);}
girl.once('��Ǯ',buyPack); //�Ȱ󶨣��󶨺�ִ�У�ִ�к�ɾ������¼����ڴ�ִ���򲻻ᱻ����
//girl.on('��Ǯ',buyCar);
//girl.removeListener('��Ǯ',buyCar);//�Ƴ�����
girl.emit('��Ǯ','��','��');//��������Ǯʱִ��buyPack��buyCar


