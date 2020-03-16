import React from 'react';
import InputGroup from './InputGroup'
import ViewControl from './ViewControl'
import Hzwriter from './hzwriter'
import NestedInput from './NestedInput'
import { observer } from "mobx-react"
import MdNext from 'react-ionicons/lib/IosArrowForward'
import MdPrev from 'react-ionicons/lib/IosArrowBack'

var log = console.log 

@observer
class Review extends React.Component {
  getCombs=(unit)=>{
    var shortGroup = [],
        longGroup = [] ,
        key = 20
        
    unit.combs.map((c,i)=>{
      var ipt = (<NestedInput 
          key={key+=20}
          unit={unit}
          unitKey={'combs'}
          index={i}
        />)
      if(c.hanzi.length<5){
         shortGroup.push(ipt)
        }
      else longGroup.push(ipt); return ''
    })
    return ({ 
      short: shortGroup,
      long: longGroup
    }) 
  }
  render(){
    var key = 0,
        unit = this.props.unit,
        combs = this.getCombs(unit)
    
    return(
      <div className="review__page">
        <div className="lesson--controls">  
          <MdPrev fontSize={'30px'} 
            onClick={e=>{log(e)}}/>
            <div className="unitid__container">
              <span  key={key}>{unit.id}&nbsp;</span><input type="checkbox" checked={unit.done}
              onChange={e => { unit.done = e.target.checked }}
            ></input>
            </div>
          <MdNext fontSize={'30px'}
            onClick={e=>{log(e)}}/>
        </div>
        
        <Hzwriter unit={unit}/>
        <InputGroup groupNumber={1} unit={unit} unitKey ={'def'} 
          label={'Definitions'} />
        <InputGroup groupNumber={2} unit={unit} unitKey ={'def_alt'} 
          label={'Other Definitions'}/>
        
        <div className="sentences"> 
          <ViewControl unit={unit} className="sentences--short" disabled="short">
            {combs.short}
          </ViewControl>          
          <ViewControl unit={unit} className="sentences--long" disabled="long">
            {combs.long}
          </ViewControl>
        </div>
      </div>
    )
  }
}

export default Review