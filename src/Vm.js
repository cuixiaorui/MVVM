import Compiler from "./Compiler"
import Dep from "./Dep"
export default class Vm{
    constructor(config){
        this._config = config;
        this._data = config.data;
        this._el = config.$el
        this._methods = config.methods;
        this._computed = config.computed;
        // 给 data 内的所有属性增加 getter 和 setter 
        this.observer(this._data)
        this.initComputed();
        this.registProxy(this._data);
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

    /**
     * this._data 的代理
     * this.xx ==> this._data.xx
     * @param {} data 
     */
    registProxy(data){
        if(!data || typeof data !== "object")return;
        Object.keys(data).forEach((key)=>{
            this.registProxy(data[key]);
            Object.defineProperty(this,key,{
                get(){
                    return data[key]         
                },
                set(val){
                    if(val !== this._data[key])
                    {
                        data[key] = val
                    }
                }
            })
        })
    }

    initComputed(){
        let vm = this;
        // 把 computed 内的属性挂载到 vm 身上
        if(typeof this._computed === "object"){
            Object.keys(this._computed).forEach((key)=>{
                Object.defineProperty(vm,key,{
                    get(){
                        return this._computed[key].bind(vm)
                    }
                })
            })
        } 
    }
}