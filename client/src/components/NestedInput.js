import React from 'react';
import { observer } from "mobx-react"
import InputSpan from './InputSpan'

const log = console.log
log()

@observer
class NestedInput extends React.Component {
  pasterAsPlainText=(event)=>{
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }
  render() {
    var unit = this.props.unit,
        unitKey = this.props.unitKey,
        idx = this.props.index,
        combination = unit[unitKey][idx].combination,
        definition = unit[unitKey][idx].definition    
    return (
      <div className="sentence__group">
        <div className={"combination__container"}>
          <span contentEditable={true}
            suppressContentEditableWarning={true}
            onPaste={this.pasteAsPlainText}
            onKeyPress={e => {
              if (e.which === 13) {
                e.returnValue = false
                if (e.preventDefault) e.preventDefault()
              }
            }}
          >{combination}</span>
        </div>
        <div className="combdef__container">
          <span contentEditable={true}
            suppressContentEditableWarning={true}
            onPaste={this.pasteAsPlainText}
            onInput={e => {if (e.keyCode === 13) e.returnValue = false }}
          >{definition}</span>
        </div>
      </div>
    )
  }
}

export default NestedInput