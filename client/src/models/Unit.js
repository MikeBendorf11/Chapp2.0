import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()
/**todo: add method to sort ascending, should be saved as such */
class Unit {
  @observable pinyin
  @observable def
  @observable def_alt
  @observable combs
  @observable done

  constructor(unit){
    Object.keys(unit).forEach(k=>{
      this[k]=unit[k]
    })
    autorun(() => {
      //log(this.report)
      
    }); 
  }
  @action swapArray(key, values){
    this[key] = values
  }
  @computed get report(){
    return JSON.stringify(this.combs, null, 2)
  }
}

export default Unit