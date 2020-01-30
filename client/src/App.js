import React from 'react';
import './styles/App.scss'
import units from './sample'
import NestedInput from './components/NestedInput'
import Unit from './models/Unit'
import { observer } from "mobx-react"
import ViewControl from './components/ViewControl'
import Hzwriter from './components/hzwriter'
import MdNext from 'react-ionicons/lib/IosArrowForward'
import MdPrev from 'react-ionicons/lib/IosArrowBack'
import InputGroup from './components/InputGroup'

var log = console.log 
log(); console.clear()

var unit = new Unit(units[0])//,

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
  componentDidMount(){
    document.body.style.background =  `url(/svg/${Math.floor(Math.random() * 10)+1}.svg)`
    document.body.style.backgroundSize= 'cover'
  }

  render() {
    var key = 0,
        combs = this.getCombs()
    
    return ( 
      <div className="App" >
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
        <InputGroup unit={unit} unitKey ={'definition'} 
          label={'Definitions'} />
        <InputGroup unit={unit} unitKey ={'definition_alt'} 
          label={'Other Definitions'}/>
        
        <div className="sentences"> 
          <ViewControl unit={unit} className="sentences--short" disabled="short">
            {combs.short}
          </ViewControl>          
          <ViewControl unit={unit} className="sentences--long" disabled="long">
            {combs.long}
          </ViewControl>
        </div>
        <div id="paper"></div>
      </div>  
    );
  }
}

export default App;
