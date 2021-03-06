import {observable, computed, autorun, action} from 'mobx' 

var log = console.log 
log(); console.clear()

const latin_map={
  "á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ì":"i","í":"i","ĭ":"i","ǐ":"i","î":"i","ò":"o","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u"}

class Search{
  @observable unitId
  @observable units
  @observable currentUnit = {}//  = {a: 1, b: [2, 5 ,6]}
  @observable query //= 1

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
      if(v[prop].match(query)){
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
    else return arr.findIndex(a=>a.match(query))
  }
  @action
  lookFor(query){
    var units = this.units,
        arrayMatch= this.arrayMatch,
        result =[],
        units = JSON.parse(this.latinise(JSON.stringify(units))),
        idx,
        query = query.trim(),
        //latin letter words need word boundary, hanzi chars don't 
        regexp = query.match(/[a-zA-Z]/) ? 
          new RegExp(`\\b${query}\\b`,'gm') : new RegExp(query, 'gm')
    this.query = query
    
    units.forEach((unit, i)=>{
      if(JSON.stringify(unit).match(regexp)){
        result.push({
          id: unit.id,
          matches: []
        })
        if(arrayMatch (unit.def, regexp) >-1 ||
        arrayMatch(unit.def_alt,regexp) >-1 ||
        arrayMatch(unit.pinyin, regexp) >-1 ||
        unit.hanzi.includes(query)) {
          result[result.length-1].matches.push(unit.hanzi+', '+
          this.units[i].pinyin) 
        }
        idx = arrayMatch(unit.combs, regexp,'hanzi')
        if(idx.length>0){
          idx.forEach(i=>{
            result[result.length-1].matches.push(
              unit.combs[i].hanzi
            ) 
          })
        }
        idx =arrayMatch(unit.combs,  regexp, 'def')
        if(idx.length>0){
          idx.forEach(i=>{
            result[result.length-1].matches.push(
              unit.combs[i].hanzi
            ) 
          })
        }
      }
    })
    
    return result
  }
}

export default Search


