class Watcher{
    constructor(vm){
        // 依赖 node 节点
        this._dep = [];

    }

    addDep(node){
        this._dep.push(node);
    }


    removeDep(node){
        //删除对应的依赖
    }

    notice(val){
        //需要通知所有的 node 节点改变值
        this._dep.forEach(node => {
            node.textContent = val;
        });
    }
}
export default Watcher