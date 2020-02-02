import React from 'react';
import { observer } from "mobx-react"
import Timer from '../models/Timer';

const log = console.log 
//log('here'); //console.clear()



@observer
class Input extends React.Component {
  render(){
    var unit = this.props.unit
    var unitKey = this.props.unitKey
    var value = unit[unitKey] || '&nbsp;'
    var idx = this.props.index
    var tmDefInput = new Timer(5)

    return (
      <div className="definition__container">
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
            var currentValue = e.target.innerHTML //persist inside interval
            clearInterval(tmDefInput.interval)
    
            tmDefInput.interval = setInterval(()=>{
              tmDefInput.count++
              if(tmDefInput.count===tmDefInput.countLimit){
                clearInterval(tmDefInput.interval)
                tmDefInput.count=0
                if(unit[unitKey]) value[idx] = currentValue
                else value.push(currentValue) //new input
              }
            },1000)
          }}
        >{value[idx]}</span>
      </div>
    )
  }
}

export default Input