import Dep from "./Dep"
import {getExpValue} from "./util.js"
export default class Watcher {
    constructor(vm, exp, cb) {
        this._vm = vm;
        this._exp = exp;
        this._cb = cb;
        // 全局变量
        Dep.target = this;
        this.update();
        // 需要清空
        Dep.target = null;
    }

    update() {
        let val = getExpValue(this._vm,this._exp)
        if(typeof val === "function")
        {
            val = val.call(this._vm)
        }
        this._cb && this._cb.call(null,val)
    }
}