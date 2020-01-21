import React from 'react';
import Close from 'react-ionicons/lib/MdClose'
import { observer } from "mobx-react"

const log = console.log

@observer
class NestedInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false
    }
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
            onInput={e => {
              if (e.keyCode === 13) e.returnValue = false
              log(e.target.innerHTML.replace(/&nbsp;/g, ''))
            }}
          >{combination}</span><Close onClick={_=>{
            unit.swapArray(unitKey, unit.combinations.filter(c=>c.combination!==combination) )
          }}/>
        </div>
        <div className="definition__container">
          <span contentEditable={true}
            suppressContentEditableWarning={true}
            onPaste={this.pasteAsPlainText}
            onInput={e => {
              if (e.keyCode === 13) e.returnValue = false
              //log(e.target.innerHTML.replace(/&nbsp;/g, ''))
            }}
          >{definition}</span><Close onClick={_=>{
            unit.swapArray(unitKey, unit.combinations.filter(c=>c.definition!==definition) )
          }}/>
        </div>
      </div>

    )
  }
}

export default NestedInput