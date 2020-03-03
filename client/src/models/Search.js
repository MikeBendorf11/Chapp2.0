import {observable, computed, autorun, action} from 'mobx' 
import Unit from './Unit'
var log = console.log 
log(); console.clear()
/**todo: add method to sort ascending, should be saved as such */
class Search{
  constructor(units){
    this.units = units
  }
  @observable phrase = ''
  lookFor(str){
    var count = {units: 0, matches: 0}
    this.units.forEach(u=>{
      if(JSON.stringify(u).includes(str)) count.unit = u.char
    })
  }
}

export default Search

/**
query ='talent'; 

units.forEach(unit=>{
    if(JSON.stringify(unit).includes(query)){
        var str = JSON.stringify(unit)
    str.split('').forEach((ch, i)=>{    
      if(str.substring(i, i+query.length)===query){
        var startQuote
        for(var j=i; j>0; j--){
          if(str[j]==='"') {startQuote = j; break; }
        }
        var endQuote
        for(var k=i; k<str.length; k++){
          if(str[k]==='"') {endQuote = k; break;}
        }
        console.log(str.substring(startQuote+1, endQuote))
      }
    })
    }
}) 
  
 */