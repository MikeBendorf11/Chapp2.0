import React from 'react';
import MdArrowUp from 'react-ionicons/lib/MdArrowUp'
import MdArrowDown from 'react-ionicons/lib/MdArrowDown'
import MdEye from 'react-ionicons/lib/MdEye'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdRemove from 'react-ionicons/lib/MdRemove'
import { observer } from "mobx-react"

var log = console.log 
log(); console.clear()

@observer
class ViewControl extends React.Component{
  constructor(){
    super()
    this.state = {
      showing: -1, //starts with hidding
    }
  }
  roulete=(direction)=>{
    var sw = this.state.showing,
        next = this.props.children[sw+1]? sw+1: this.state.showing==-1?-1:0,
        prev = this.props.children[sw-1]? sw-1: this.props.children.length-1

    switch (direction){
      case 'prev': this.setState({showing: prev}); break
      case 'next': this.setState({showing: next}); break
      default: log('Wrong Direction')
    }
  }
  toggleDefinition=()=>{
    document
      .querySelectorAll('.combdef__container')
      .forEach(el=>{
        if(el.style.display==='inline-block')
          el.style.display='none'
        else el.style.display='inline-block'
      })
  }
  toggleSentGroup=(target1, target2)=>{
    if(target1.style.display==='none'){
      target1.style.display='block'
    } else {target1.style.display = 'none'
    target2.style.display="block"}
  }
  filterRemove(a, b){
    log(JSON.stringify(a)!==JSON.stringify(b))
    return JSON.stringify(a)!==JSON.stringify(b)
  }
  render(){
    const shtIsDisabled = this.props.disabled==='short'? true: false, 
          lngIsDisabled = this.props.disabled==='long'? true: false, 
          unit = this.props.unit;
    var disabledBeforeStart = this.state.showing === -1
    
    return(
      <div className={"view-control-box "+ this.props.className}>
        <button disabled={shtIsDisabled} onClick={e=>{
          this.toggleSentGroup(
            document.querySelector('div[class*=sentences--long]'),
            document.querySelector('div[class*=sentences--short]'))
            document.querySelectorAll('.combdef__container')
              .forEach(el=>{el.style.display='none'})
        }}>short</button>
        <button disabled={lngIsDisabled} onClick={e=>{
          this.toggleSentGroup(
            document.querySelector('div[class*=sentences--short]'),
            document.querySelector('div[class*=sentences--long]'))   
            document.querySelectorAll('.combdef__container')
              .forEach(el=>{el.style.display='none'})
        }}>long</button>
        <button onClick={_=>this.roulete('prev')}><MdArrowUp/></button>
        <button onClick={_=>this.roulete('next')}><MdArrowDown/></button>
        <button disabled={disabledBeforeStart} 
          onClick={this.toggleDefinition}><MdEye/></button>
        <button><MdAdd onClick={_=>{
          unit.combinations.push({combination: '\u00A0', definition: '\u00A0'})
          this.setState({showing: unit.combinations.length-1})
        }}/></button>
        <button disabled={disabledBeforeStart}><MdRemove onClick={_=>{
            unit.swapArray('combinations', 
              unit.combinations.filter(c=>
                JSON.stringify(c)!==JSON.stringify(unit.combinations[this.state.showing]))) 
        }}
        /></button>
        {this.props.children[this.state.showing]}
      </div>
    )
  }
}

export default ViewControl