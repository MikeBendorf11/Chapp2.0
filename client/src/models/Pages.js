import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()

class Pages {
  @observable visible=""
  @observable hidden=""
  review='review'
  search='editor' 
  browser='browser'
  pages=[this.review, this.search]//, this.browser]
  @observable current=""

  hide(page){
    //log(document.querySelector(`[class*=${page}__page]`))
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