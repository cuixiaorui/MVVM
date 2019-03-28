    /**
     * 获取表达式的值
     * 有一种情况是 aaa.bbb.ccc
     * 所以需要切割
     */
    export var getExpValue =  function(vm,exp) {
        let list = exp.split('.');
        let data = vm;
        list.forEach(key => {
            data = data[key]
        });
        return data;
    }


    export var setExpValue = function(vm,exp,val){
        let list = exp.split('.');
        let data = vm.data;
        list.forEach((key,index) => {
            if(index === list.length -1){
                data[key] = val;
            }else{
                data = data[key]
            }

        });
        return data; 


    }