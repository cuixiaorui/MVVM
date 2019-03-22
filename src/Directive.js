
import {setExpValue} from "./util.js"
let handler = {
    "text":function(node,val){
        node.textContent = val;
    },
    "show":function(node,boo){
       node.style.display = boo?"block":"none"
    },
    "model":function(node,val,exp,vm){
        let oldVal = "";
        node.addEventListener('input',(e)=>{
            if(oldVal !== node.value)
            {
                oldVal = node.value;
                setExpValue(vm,exp,node.value)
            }
        })
    },
    "click":function(vm,node,exp){
        node.addEventListener("click",function(){
            const handler = vm._methods[exp];
            if(!handler){
                console.error(`methods 内不存在的方法:${exp}`)
            }
            handler.call(vm);
        })
    }
}
export default{
    getHandler(name){
        if(!handler[name])
        {
            console.error(`指令不支持:${name}`)
            return;
        }
        return handler[name]
    }
}