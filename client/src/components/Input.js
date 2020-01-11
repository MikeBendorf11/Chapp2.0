import React from 'react';
import Close from 'react-ionicons/lib/MdClose'
import { observer } from "mobx-react"

const log = console.log

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
      <div className='input__container'>
        <input 
          value={value[idx]}
          size={value[idx].length}
          onChange={e=>{value[idx]=e.target.value}}
          readOnly={this.state.readOnly}
          onDoubleClick={(e)=>{this.setState({readOnly: false})}}
          onBlur={_=>this.setState({readOnly: true})}
        ></input><Close onClick={_=>{
              unit.swapArray(unitKey,value.filter(v=>v!=value[idx]) )
            }
          }/>          
      </div>
    )
  }
}

export default Input