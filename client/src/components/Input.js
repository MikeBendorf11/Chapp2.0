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
          onKeyPress={e => {
            if (e.which === 13) {
              e.returnValue = false
              if (e.preventDefault) e.preventDefault()
            }
          }}
          onInput={e=>{
            if(window.tm) {log('here');clearInterval(window.tm)}
            window.count = 0;
            window.tm = setInterval(()=>{
              window.count++; log(window.count)
              if(window.count==5) {log('there'); clearInterval(window.tm)} 
            },1000)
            
          }}
        >{value[idx]}</span>
      </div>
    )
  }
}

export default Input