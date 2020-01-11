import {observable, computed, autorun, action} from 'mobx' 

class Unit {
  @observable pronunciation
  @observable definition
  @observable definition_alt
  @observable combinations
  @observable pending

  constructor(unit){
    Object.keys(unit).forEach(k=>{
      this[k]=unit[k]
    })
    autorun(() => {
      console.log(this.report)
      //console.log(this.todos[0])
    }); 
  }
  @action swapArray(key, values){
    this[key] = values
  }
  @computed get report(){
      return JSON.stringify(this.definition, null, 2)
  }
}


export default Unit