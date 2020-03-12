import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()

class Pages {
  @observable visible=""
  @observable hidden=""
  review='review'
  editor='editor' 
  browser='browser'
  pages=[this.review, this.editor]//, this.browser]
  @observable current=""

  hide(page){
    
    document.querySelector(`[class*=${page}__page]`)
    .style.display="none"
  }
  show(page){
    this.pages.forEach(p=>this.hide(p))
    document.querySelector(`[class*=${page}__page]`)
      .style.display="block"
    this.current=page
  }
}

export default Pages