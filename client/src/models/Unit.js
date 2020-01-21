import {observable, computed, autorun, action} from 'mobx' 

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
      //console.log(this.report)
      //console.log(this.todos[0])
    }); 
  }
  @action swapArray(key, values){
    this[key] = values
  }
  @computed get report(){
      return JSON.stringify(this.passed, null, 2)
  }
}


export default Unit