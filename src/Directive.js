let handler = {
    "text":function(node,val){
        node.textContent = val;
    },
    "show":function(node,boo){
       node.style.display = boo?"block":"none"
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