import React from 'react';
import './styles/App.scss'
import units from './sample'
import Input from './components/Input'
import Sentence from './components/Sencence'
import Unit from './models/Unit'
import { observer } from "mobx-react"

const log = console.log
var unit = new Unit(units[0])
//unit.definition =  ['asd', 'dfdf']
//log(unit)
@observer
class App extends React.Component {
  render() {
    var key = 0

    return (
      <div className="App">
        <span className="unitid__container" key={key}>{unit.id}</span>
        <span key={key += 1}>{unit.char}</span>
        <div className="checkbox__container">
          <input type="checkbox" value={unit.passed}
            onClick={e => { unit.passed = e.target.checked }}
          ></input>
          <span>{unit.passed ? 'passed' : 'pending'}</span>

        </div>
      
        <div className="input__group">
          {unit.pronunciation.map((d, i) => {
            return <Input
              key={key += 10}
              unit={unit}
              unitKey={'pronunciation'}
              index={i}>
            </Input>
          })}
        </div>
        <br></br>
        <div className="input__group">
          {unit.definition.map((d, i) => {
            return <Input
              key={key += 10}
              unit={unit}
              unitKey={'definition'}
              index={i}>
            </Input>
          })}
        </div>
        <br></br>
        <div className="input__group">
          {unit.definition_alt.map((d, i) => {
            return <Input
              key={key += 10}
              unit={unit}
              unitKey={'definition_alt'}
              index={i}>
            </Input>
          })}
        </div>
        <br></br>
        <div className="sentence__group">
          {unit.combinations.map((c,i)=>{
            return <div>
              <Sentence 
                key={key+=20}
                unit={unit}
                unitKey={'combinations'}
                index={i}
              />
            </div>
          })}
        </div>


      </div>
    );
  }

}

export default App;
