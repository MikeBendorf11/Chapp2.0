import React from 'react';
import { observer } from "mobx-react"
import InputSpan from './InputSpan'

var log = console.log

@observer
class InputGroup extends React.Component {

  handleViewDefs=(e)=>{
    e.target.style.display='none'
    e.target.nextSibling.style.display='inline'
    e.target.nextSibling.nextSibling.style.display='inline'
  }
  handleShowNewInput=(e)=>{
    document.querySelector(".input__group"+this.props.groupNumber)
      .querySelector('.definitions').querySelector('.new--input').style.display = 'inline-block'
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
      <div className={"input__group"+this.props.groupNumber}>
      <label onClick={this.handleViewDefs}>{this.props.label}</label>
      <div className="definitions">
        {unit[unitKey].map((d, i) => {
          var newIpt = ''
            if(i===unit[unitKey].length-1) newIpt = 
            <div key={unit[unitKey].length} className={'new--input'}>
              <InputSpan unit={unit} unitKey={unitKey} 
                index={unit[unitKey].length}/>
            </div>
          return [
            <div key={i} className={'definition__container'}>
              <InputSpan  unit={unit} unitKey={unitKey} 
                index={i} 
              />
            </div>, newIpt]
        })} 
      </div>
      <div 
        onClick={this.handleShowNewInput} 
        className="button--add--def">
          <span><b>+</b></span>
      </div>
    </div>
    )
  }
}

export default InputGroup