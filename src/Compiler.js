import WatcherControl from "./WatcherControl"
export default class Compiler{
    constructor(el,vm){
        this._el = el;
        this._vm = vm;
        if(!this._el){
            console.error(`必须指定一个 el 字段`)
            return;
        }

        if(typeof this._el === "string"){
            this._el = document.querySelector(el);
        }

        // 需要检测 el 是不是一个合法的元素节点
        // 如果节点是元素节点，则 nodeType 属性将返回 1。
        // 如果节点是属性节点，则 nodeType 属性将返回 2。
        if(!this._el || !this._el.nodeType || this._el.nodeType === 2)
        {
            console.error(`el 必须是一个元素节点`)
            return;
        }
        

        // 2. 需要解析 node 节点
        // 这里我们先只需要获取到对应的 {{}} 即可
        // 有一点要知道的是 {{}} 只在 textNode 内
        this.compileNode(this._el);
    }
    /**
     * 这里遍历整个 dom 树
     * 递归
     */
    compileNode(parentNode){
        console.log(parentNode)
        const reg = /{{\w*}}/
        // 因为我们需要获取到 textNode 所以要使用 childNodes
        // ps: childNodes 可以获取 元素节点和文本节点
        //     children   只能获取到元素节点
        Array.from(parentNode.childNodes).forEach((node)=>{
            // 1 是元素节点
            if(node.nodeType === 1){
                
            }else if(node.nodeType === 3){
                // 文本节点
                // 只有{{}}这样的文本内容才是我们需要捕获的
                let textContent = node.textContent.trim(); 
                if(reg.test(textContent)){
                    console.log(textContent)
                    //命中后，这里我们需要把{{}}内的str 替换成在 vm.data 内的值
                    let exp = textContent.slice(2,-2) 
                    let val = this.getExpValue(exp);

                    // 这里需要 node 和这个 exp 绑定在一起
                    // 因为之后当 exp 变更的时候，也需要通知这个 node 变更
                    WatcherControl.get(exp).addDep(node)
                    node.textContent = val;
                }
            }

            if(node.childNodes.length > 0){
                this.compileNode(node)
            }
        })
    }

    /**
     * 获取表达式的值
     * 有一种情况是 aaa.bbb.ccc
     * 所以需要切割
     */
    getExpValue(exp){
        let list = exp.split('.');
        let val;
        list.forEach(key => {
            val = this._vm.data[key]
        });
        return val;
    }
}