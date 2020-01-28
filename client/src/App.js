import React from 'react';
import './styles/App.scss'
import units from './sample'
import Input from './components/Input'
import NestedInput from './components/NestedInput'
import Unit from './models/Unit'
// import View from './models/View'
import { observer } from "mobx-react"
import ViewControl from './components/ViewControl'
import Hzwriter from './components/hzwriter'
import MdNext from 'react-ionicons/lib/IosArrowForward'
import MdPrev from 'react-ionicons/lib/IosArrowBack'

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
        <div className="lesson--controls">
          
          <MdPrev fontSize={'30px'} 
            onClick={e=>{log(e)}}/>
            <div className="unitid__container">
              <span  key={key}>{unit.id}&nbsp;</span><input type="checkbox" checked={unit.passed}
              onChange={e => { unit.passed = e.target.checked }}
            ></input>
            </div>
          <MdNext fontSize={'30px'}
            onClick={e=>{log(e)}}/>
        </div>
        
        <Hzwriter unit={unit}/>

        {/* <div className="input__group">
          {unit.pronunciation.map((d, i) => {
            return <Input
              key={key += 10}
              unit={unit}
              unitKey={'pronunciation'}
              index={i}>
            </Input>
          })}
        </div> */}
        <br></br>
        <div className="input__group">
          <label onClick={e=>{
            e.target.style.display='none'
            e.target.nextSibling.style.display='block'
          }}>definitions</label>
          <div className="definitions">
            {unit.definition.map((d, i) => {
              return <Input
                key={key += 10}
                unit={unit}
                unitKey={'definition'}
                index={i}>
              </Input>
            })}
          </div>
        </div>
        
        <div className="input__group">
        <label onClick={e=>{
          e.target.style.display='none'
            e.target.nextSibling.style.display='block'
          }}>other definitions</label>
        <div className="definitions">
          {unit.definition_alt.map((d, i) => {
              return <Input 
                key={key += 10}
                unit={unit}
                unitKey={'definition_alt'}
                index={i}>
              </Input>
            })}
        </div>
          
        </div>
        <div className="sentences"> 
          <ViewControl unit={unit} className="sentences--short" disabled="short">
            {combs.short}
          </ViewControl>          
          <ViewControl unit={unit} className="sentences--long" disabled="long">
            {combs.long}
          </ViewControl>
        </div>
      </div>
    );
  }
}

export default App;
