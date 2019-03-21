import Watcher from "./Watcher";
import Directive from "./Directive"
const eventPrefix = "on:"
const prefix = "c-"
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

        // 解析元素节点
        this.compileNode(this._el);
    }
    /**
     * 这里遍历整个 dom 树
     * 递归
     */
    compileNode(parentNode){
        const reg = /\{\{[\w.]*\}\}/
        // 因为我们需要获取到 textNode 所以要使用 childNodes
        // childNodes: 可以获取元素节点和文本节点
        // children:   只能获取到元素节点
        Array.from(parentNode.childNodes).forEach((node)=>{
            // 1 是元素节点
            if(node.nodeType === 1){
                this.compileElementNode(node); 
            }else if(node.nodeType === 3){
                // 文本节点
                // 只有{{}}这样的文本内容才是我们需要捕获的
                let textContent = node.textContent.trim(); 
                if(reg.test(textContent)){
                    //命中后，这里我们需要把 {{}} 内的 str 替换成在 vm.data 内的值
                    let exp = textContent.slice(2,-2) 
                    let directiveHandler = Directive.getHandler("text");
                    new Watcher(this._vm, exp, (val) => {
                        directiveHandler(node,val);
                    });
                }
            }

            if(node.childNodes.length > 0){
                this.compileNode(node)
            }
        })
    }
    compileElementNode(node){
        // 1. 获取 node 的属性
        // 2. 如果命中的话，调用对应的处理函数 
        // 命中-》 c- 开头
        Object.keys(node.attributes).forEach((key)=>{
            const {name,value} = node.attributes[key]
            if(name.startsWith(prefix)){
                let exp = value
                let directiveName = name.slice(2);

                if(directiveName.startsWith(eventPrefix)){
                    // 属于事件类型
                    let eventType = directiveName.slice(3);
                    let directiveHandler = Directive.getHandler(eventType);
                    directiveHandler(this._vm,node,exp)
                }else{
                    let directiveHandler = Directive.getHandler(directiveName);
                    new Watcher(this._vm, exp, (val) => {
                        directiveHandler(node, val);
                    });
                }

            }
        })
    }
}