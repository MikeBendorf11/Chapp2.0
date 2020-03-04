import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()

const latin_map={
  "á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","í":"i","ĭ":"i","ǐ":"i","î":"i","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u"}

class Search{
  @observable phrase = ''
  constructor(units){
    this.units = units
  }
  //gets rid of accents for pinyin, hanzi is left unchanged
  latinise=(str)=>{
    return str.replace(
      /[^A-Za-z0-9\[\] ]/g, 
      function(a){return latin_map[a]||a}
    )
  }
  //if array of objects, get me all the idx matches
  getAllIndexes=(arr, query, prop)=> {
    var indexes = []
    arr.forEach((v,i)=>{
      if(v[prop].includes(query)){
        indexes.push(i)
      }
    })
    return indexes
  }
  //returns the first string match for an array or (array of objects) 
  arrayMatch=(arr, query, prop)=>{
    if(prop){
      return this.getAllIndexes(arr,query,prop)
    }
    else return arr.findIndex(a=>a.includes(query))
  }
  @action
  lookFor(query){
    var units = this.units,
        arrayMatch= this.arrayMatch,
        result =[],
        units = JSON.parse(this.latinise(JSON.stringify(units))),
        idx

    units.forEach((unit)=>{
      if(JSON.stringify(unit).includes(query)){
        result.push({
          id: unit.id,
          matches: []
        })
        
        idx =arrayMatch(unit.combinations,  query, 'definition')
        if(idx.length>0)
          idx.forEach(i=>{
            result[result.length-1].matches.push(
              unit.combinations[i].combination
            ) 
          })
        idx = arrayMatch(unit.combinations, query,'combination')
        if(idx.length>0)
          idx.forEach(i=>{
            result[result.length-1].matches.push(
              unit.combinations[i].combination
            ) 
          })
          
        if(arrayMatch (unit.definition, query) >-1 ||
        arrayMatch(unit.definition_alt,query) >-1 ||
        arrayMatch(unit.pronunciation, query) >-1 ) 
          result[result.length-1].matches.push(unit.char) 
      }
    })
    log(result) 
  }
}

export default Search


