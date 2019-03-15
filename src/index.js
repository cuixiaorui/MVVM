import Vm from "./Vm"


var vm = new Vm({
    $el:"#app",
    data:{
        ceshi: "heiheihei"
    }
});
window.vm = vm;
console.log(vm)