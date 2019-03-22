import Dep from "./Dep"
import {getExpValue} from "./util.js"
export default class Watcher {
    constructor(vm, exp, cb) {
        this._vm = vm;
        this._cb = cb;
        // 全局变量
        Dep.target = this;
        this.update(getExpValue(this._vm,exp));
        // 需要清空
        Dep.target = null;
    }

    update(val) {
        this._cb && this._cb.call(null,val)
    }

}