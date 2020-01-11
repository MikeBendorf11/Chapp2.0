import React from 'react';
import './styles/App.scss'
import units from './sample'  
import Input from './components/Input'
import Unit from './models/Unit'
import { observer } from "mobx-react"

const log = console.log
var unit = new Unit(units[0])
//unit.definition =  ['asd', 'dfdf']
//log(unit)
@observer
class App extends React.Component {
  render(){
    var key = 0
    
    return (
      <div className="App">
        <span key={key}>{unit.id}</span>
        <span key={key+=1}>{unit.char}</span>
    <input type="checkbox" value={unit.pending}></input>
    <span>{unit.pending? 'pending': 'passed'}</span>
<br></br><br></br>
      
    <div className="input__group">
      {unit.definition.map((d,i)=>{
            return <Input 
                      key={key+=10} 
                      unit={unit}
                      unitKey={'definition'}
                      index={i}>
                    </Input>
          })}
  
    </div>

  
      </div>
    );  
  }
  
}

export default App;
