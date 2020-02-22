import React from 'react';
import { observer } from "mobx-react"

const log = console.log
log()

@observer
class NestedInput extends React.Component {
  pasteAsPlainText=(e)=>{
    e.preventDefault()
    const text = (e.originalEvent||e).clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }
  inputSpan=(type,timer)=>{
    var unit = this.props.unit,
        unitKey = this.props.unitKey,
        unitArr = unit[unitKey], 
        idx = this.props.index,
        data = type==='combination'? unit[unitKey][idx].combination:
          unit[unitKey][idx].definition
    return(
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
          if(!e.target.innerHTML) e.target.innerHTML = '\u00A0'
          var currentValue = e.target.innerHTML
          
          clearInterval(timer.interval)
          timer.interval = setInterval(()=>{
            timer.count++
            if(timer.count===timer.countLimit){
              clearInterval(timer.interval)
              timer.count=0  
              //log(currentValue)
              if(currentValue.match(/([^\s])/)) //mobile is fine
                unitArr[idx][type] = currentValue
                  .replace(/&nbsp;/gm,' ').trim()
            }
          },1000)
        }
      }>
        {data}
      </span>
    )
  }
  render() {
    var timer1 = {countLimit: 3, count: 0}, //input delay
        timer2 = {countLimit: 3, count: 0}

    return (
      <div className="sentence__group">
        <div className={"combination__container"}>
          {this.inputSpan('combination',timer1)}        
        </div>
        <div className="combdef__container">
          {this.inputSpan('definition',timer2)}
        </div>
      </div>
    )
  }
}

export default NestedInput