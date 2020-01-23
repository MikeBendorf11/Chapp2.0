import React from 'react';
import './styles/App.scss'
import units from './sample'
import Input from './components/Input'
import NestedInput from './components/NestedInput'
import Unit from './models/Unit'
// import View from './models/View'
import { observer } from "mobx-react"
import ViewControl from './components/ViewControl'

var log = console.log 
log(); console.clear()

var unit = new Unit(units[0])//,
    // view = new View(),
    // showingShort = view.shortComb,
    // showingLong = view.longComb

@observer
class App extends React.Component {
  getCombs=()=>{
    var shortGroup = [],
        longGroup = [] ,
        key = 20
        
    unit.combinations.map((c,i)=>{
      var ipt = (<NestedInput 
          key={key+=20}
          unit={unit}
          unitKey={'combinations'}
          index={i}
        />)
      if(c.combination.length<5){
         shortGroup.push(ipt)
        }
      else longGroup.push(ipt); return ''
    })
    return ({
      short: shortGroup,
      long: longGroup
    }) 
  }
  render() {
    var key = 0,
        combs = this.getCombs()
    
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
        <br></br><p>COMBS</p>
        <div className="sentences">
          
          <ViewControl className="sentences--short" disabled="short">
            {combs.short}
          </ViewControl>          
          <ViewControl className="sentences--long" disabled="long">
            {combs.long}
          </ViewControl>
        </div>


      </div>
    );
  }

}

export default App;
