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
        },
        onSwitch(){
            this.isShow = !this.isShow;
        }
    },
    computed: {
        ceshi(){
            return `计算属性:${this.count}` 
        }
    },
    watch: {
        isShow(val,oldVal){
            console.log(`isShow： val:${val} oldVal:${oldVal}`)
        }
    }
});
window.vm = vm;