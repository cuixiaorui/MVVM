import Dep from "./Dep"
export default class Watcher {
    constructor(vm, exp, cb) {
        this._vm = vm;
        this._cb = cb;
        // 全局变量
        Dep.target = this;
        this.update(this.getExpValue(exp));
        // 需要清空
        Dep.target = null;
    }

    update(val) {
        this._cb && this._cb.call(null,val)
    }

    /**
     * 获取表达式的值
     * 有一种情况是 aaa.bbb.ccc
     * 所以需要切割
     */
    getExpValue(exp) {
        let list = exp.split('.');
        let data = this._vm.data;
        list.forEach(key => {
            data = data[key]
        });
        return data;
    }
}