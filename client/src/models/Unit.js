import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()
/**todo: add method to sort ascending, should be saved as such */
class Unit {
  @observable pronunciation
  @observable definition
  @observable definition_alt
  @observable combinations
  @observable passed

  constructor(unit){
    Object.keys(unit).forEach(k=>{
      this[k]=unit[k]
    })
    autorun(() => {
      log(this.report)
      
    }); 
  }
  @action swapArray(key, values){
    this[key] = values
  }
  @computed get report(){
    return JSON.stringify(this.combinations, null, 2)
  }
}

export default Unit