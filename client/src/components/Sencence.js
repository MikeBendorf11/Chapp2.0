import React from 'react';
import Close from 'react-ionicons/lib/MdClose'
import { observer } from "mobx-react"

const log = console.log

@observer
class Sentence extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false
    }
  }
  render() {
    var unit = this.props.unit
    var unitKey = this.props.unitKey
    var idx = this.props.index
    log(unitKey)
    var combination = unit[unitKey][idx].combination
    var definition = unit[unitKey][idx].definition

    return (
      <div>
        <div className="sentence__container">
          <span contentEditable={true}
            suppressContentEditableWarning={true}
            onPaste={this.pasteAsPlainText}
            onInput={e => {
              if (e.keyCode == 13) e.returnValue = false
              log(e.target.innerHTML.replace(/&nbsp;/g, ''))
            }}
          >{combination}</span><Close />
        </div>
        <div className="sentence__container">
          <span contentEditable={true}
            suppressContentEditableWarning={true}
            onPaste={this.pasteAsPlainText}
            onInput={e => {
              if (e.keyCode == 13) e.returnValue = false
              log(e.target.innerHTML.replace(/&nbsp;/g, ''))
            }}
          >{definition}</span><Close />
        </div>
      </div>

    )
  }
}

export default Sentence