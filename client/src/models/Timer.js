import {observable} from 'mobx' //, computed, autorun, action

class Timer {
  
  @observable countLimit
  @observable count = 0
  @observable interval

  constructor(countLimit){
    this.countLimit = countLimit
  }
  
  
  
  
}

export default Timer