import React from 'react';
import { observer } from "mobx-react"

const log = console.log 
//log('here'); //console.clear()

@observer
class Input extends React.Component {
  render(){
    var unit = this.props.unit,
      unitKey = this.props.unitKey,
      unitArr = unit[unitKey],
      length = unit[unitKey].length,
      idx = this.props.index,
      type = idx===length? 'new': 'old', //def
      tmDefInput = {countLimit: 3, count: 0}

    return (
      <div className={this.props.className}>
        <span contentEditable={true}
          suppressContentEditableWarning={true}
          onPaste={this.pasteAsPlainText}
          onKeyPress={e => {
            if (e.which === 13) {
              e.returnValue = false
              if (e.preventDefault) e.preventDefault()
            }
          }}
          onInput={e=>{
            var target = e.target, //persist inside interval
              currentValue = e.target.innerHTML //persist
            clearInterval(tmDefInput.interval)//repeated typing
    
            tmDefInput.interval = setInterval(()=>{
              tmDefInput.count++
              if(tmDefInput.count===tmDefInput.countLimit){
                clearInterval(tmDefInput.interval)
                tmDefInput.count=0
                if(type==='old') {
                  if(!currentValue){
                    unit.swapArray(
                      unitKey, 
                      unit[unitKey].filter(a=>a!=unit[unitKey][idx])
                    )
                  } else unitArr[idx] = currentValue
                    .replace(/&nbsp;/gm,' ').trim()
                }
                else {
                  if(!currentValue){
                    target.innerHTML = '\u00A0'
                    target.parentNode.style.display = 'none'
                  } else unitArr.push(currentValue
                    .replace(/&nbsp;/gm,' ').trim()) 
                }
              }
            },1000)
          }}
        >{type==='new'? '\u00A0': unitArr[idx] }</span>
      </div>
    )
  }
}

export default Input