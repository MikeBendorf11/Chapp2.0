import React from 'react';
// import Close from 'react-ionicons/lib/MdClose'
import { observer } from "mobx-react"

var log = console.log 
log(); console.clear()

@observer
class Input extends React.Component {
  constructor(props){
    super(props)
    this.state={
      readOnly: true,
    }
  }
  render(){
    var unit = this.props.unit
    var unitKey = this.props.unitKey
    var value = unit[unitKey]
    var idx = this.props.index
    
    return (
      <div className="definition__container">
        <span contentEditable={true}
          suppressContentEditableWarning={true}
          onPaste={this.pasteAsPlainText}
          onInput={e => {
            if (e.keyCode === 13) e.returnValue = false
            log(e.target.innerHTML.replace(/&nbsp;/g, ''))
          }}
        >{value[idx]}</span>
        {/* <Close onClick={_=>{
          unit.swapArray(unitKey, value.filter(c=>c!==value[idx]) )
        }}/> */}
      </div>
    )
  }
}

export default Input