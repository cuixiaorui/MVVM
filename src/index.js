import Vm from "./Vm"


var vm = new Vm({
    $el:"#app",
    data:{
        ceshi: "heiheihei",
        isShow: true,
        info:{
            name:"cxr"
        }
    }
});
window.vm = vm;
console.log(vm)