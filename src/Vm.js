import Compiler from "./Compiler"
import Dep from "./Dep"
export default class Vm{
    constructor(config){
        this._config = config;
        this._data = config.data;
        this._el = config.$el
        // 给 data 内的所有属性增加 getter 和 setter 
        this.observer(this._data)
        // 解析 dom 
        new Compiler(this._el,this); 
         
    }

    observer(data){
        if(!data || typeof data !== "object")return;
        Object.keys(data).forEach((key)=>{
            let val = data[key]
            let dep = new Dep();
            Object.defineProperty(data,key,{
                enumerable:true,
                configurable:false,
                get(){
                    if(Dep.target){
                        dep.add(Dep.target)
                    }
                    return val;
                },
                set(newVal){
                    if(val !== newVal){
                        val = newVal;
                        dep.notice(newVal);
                    }
                }
            })
            this.observer(val);
        })
    }

    get data(){
        return this._data;
    }
}