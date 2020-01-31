import React from 'react';
import { observer } from "mobx-react"
import Input from './Input'

const log = console.log
log()

@observer
class InputGroup extends React.Component {
  constructor(props) {
    super(props)
    log()
  }
  handleViewDefs=(e)=>{
    e.target.style.display='none'
    e.target.nextSibling.style.display='inline-block'
    e.target.nextSibling.nextSibling.style.display='inline-block'
  }
  handleShowNewInput=(e)=>{
    e.target.parentNode
      .querySelector('.definitions').querySelector('.new--input').style.display = 'inline-block'
  } 
  handleNewInputChange=(e)=>{
    var unit = this.props.unit,
    unitKey = this.props.unitKey
    var value = e.target.innerHTML.replace(/&nbsp;/g, '').trim()
    if(value) unit[unitKey].push(value)
    else {
      e.target.innerHTML = '&nbsp;'
      e.target.style.display="none"
    }
    //log(e.target)
  }
  pasterAsPlainText=(event)=>{
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }
  render(){
    var unit = this.props.unit,
        unitKey = this.props.unitKey

    return (
      <div className="input__group">
      <label onClick={this.handleViewDefs}>{this.props.label}</label>
      <div className="definitions">
        {unit[unitKey].map((d, i) => {
          var newIpt = ''
            if(i===unit[unitKey].length-1) newIpt = <span 
              key={99}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onPaste={this.pasteAsPlainText}
              onKeyPress={e => {
                if (e.which === 13) {
                  e.returnValue = false
                  if (e.preventDefault) e.preventDefault()
                }
              }}
              className="new--input"
              onBlur={this.handleNewInputChange}
            > &nbsp;</span>
          return [<Input key={i} unit={unit} unitKey={unitKey} index={i}>
            </Input>, newIpt]
        })} 
      </div>
      <span 
        onClick={this.handleShowNewInput} 
        className="button--add--def">
          +
      </span>
    </div>
    )
  }
}

export default InputGroup