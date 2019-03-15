import Watcher from "./Watcher"
class Sub{
    constructor(){
        this._map = {}
    }

    subscribe(key){
        this._map[key] = new Watcher(this);
    }


    get(key){
        return this._map[key]
    }

    notice(key,newVal){
        let watch = this.get(key)
        if(watch){
            watch.notice(newVal);
        }
    }

}

export default new Sub();