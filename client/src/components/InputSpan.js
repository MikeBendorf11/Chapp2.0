import React from 'react';
import { observer } from "mobx-react"

const log = console.log 
log(); console.clear()

@observer
class InputSpan extends React.Component {
  pasteAsPlainText=(event)=>{
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  render(){
    var unit = this.props.unit,
    unitKey = this.props.unitKey,
    unitArr = unit[unitKey],    
    idx = this.props.index,
    type = idx===unitArr.length? 'new': 'old', //def
    timer = {countLimit: 3, count: 0} //input delay

    return (
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
            clearInterval(timer.interval)//repeated typing
    
            timer.interval = setInterval(()=>{
              timer.count++
              if(timer.count===timer.countLimit){
                clearInterval(timer.interval)
                timer.count=0
                if(type==='old') {
                  if(!currentValue){
                    unit.swapArray(
                      unitKey, 
                      unitArr.filter(a=>a!==unitArr[idx])
                    )
                  } else unitArr[idx] = currentValue
                    .replace(/&nbsp;/gm,' ').trim()
                }
                else if(type==='new'){
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
    )
  }
}

export default InputSpan