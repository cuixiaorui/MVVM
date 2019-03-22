import Vm from "./Vm"


var vm = new Vm({
    $el:"#app",
    data:{
        count:1,
        isShow: true,
        info:{
            name:"cxr",
            age:1,
            message: "model",
        }
    },
    methods: {
        onclick(){
            this.count += 1;
            // this.info.age += 1;
        },
        onSwitch(){
            this.isShow = !this.isShow;
        }
    }
});
window.vm = vm;