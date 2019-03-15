import Compiler from "./Compiler"
import Watcher from "./Watcher"
import WatcherControl from "./Sub"
export default class Vm{
    constructor(config){
        this._config = config;
        this._data = config.data;
        this._el = config.$el
        // 1.给 data 内的所有属性增加 get 和 set 
        // 先不考虑嵌套数据的问题
        Object.keys(this._data).forEach((key)=>{
            let val = this._data[key]
            // 给每一个 data 注册一个 watcher 对象
            WatcherControl.subscribe(key)
            Object.defineProperty(this._data,key,{
                enumerable:true,
                configurable:false,
                get(){
                    return val;
                },
                set(newVal){
                    val = newVal;
                    WatcherControl.notice(key,newVal)
                }
            })
        })


        // 2.解析 html 
        new Compiler(this._el,this);
         
    }

    get data(){
        return this._data;
    }
}