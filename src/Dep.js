/**
 * 观察者
 * wather是其订阅者
 */
export default class Dep {
    constructor() {
        this._list = []
    }

    add(watcher) {
        this._list.push(watcher)
    }

    notice(val) {
        this._list.forEach(watcher => {
            watcher.update(val);
        });
    }
}
