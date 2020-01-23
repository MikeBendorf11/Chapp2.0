import React from 'react';
import MdArrowUp from 'react-ionicons/lib/MdArrowUp'
import MdArrowDown from 'react-ionicons/lib/MdArrowDown'
import MdEye from 'react-ionicons/lib/MdEye'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdRemove from 'react-ionicons/lib/MdRemove'

var log = console.log 
log(); console.clear()

export default class ViewControl extends React.Component{
  constructor(){
    super()
    this.state = {
      showing: 0,

    }
  }
  componentDidMount(){
    //log(this.props.children[0]
  }
  roulete=(direction)=>{
    var sw = this.state.showing
    var next = this.props.children[sw+1]? sw+1: 0
    var prev = this.props.children[sw-1]? sw-1: this.props.children.length-1
    switch (direction){
      case 'prev': this.setState({showing: prev}); break
      case 'next': this.setState({showing: next}); break
      default: log('Wrong Direction')
    }
  }
  toggleDefinition=()=>{
    document.querySelectorAll('.definition__container')
            .forEach(el=>{
              if(el.style.display==='inline-block')
                el.style.display='none'
            else el.style.display='inline-block'
            })
  }
  toggleSentGroup=(target1, target2)=>{
    
    if(target1.style.display==='none'){
      target1.style.display='inline'
    } else {target1.style.display = 'none'
    target2.style.display="inline"}
  }
  render(){
    var shtIsDisabled = this.props.disabled==='short'? true: false
    var lngIsDisabled = this.props.disabled==='long'? true: false
    return(
      <div className={"view-control-box "+ this.props.className}>
        <button disabled={shtIsDisabled} onClick={e=>{
          this.toggleSentGroup(
            document.querySelector('div[class*=sentences--long]'),
            document.querySelector('div[class*=sentences--short]'))
            document.querySelectorAll('.definition__container')
              .forEach(el=>{el.style.display='none'})
        }}>short</button>
        <button disabled={lngIsDisabled} onClick={e=>{
          this.toggleSentGroup(
            document.querySelector('div[class*=sentences--short]'),
            document.querySelector('div[class*=sentences--long]'))   
            document.querySelectorAll('.definition__container')
              .forEach(el=>{el.style.display='none'})
        }}>long</button>
        <button onClick={_=>this.roulete('prev')}><MdArrowUp/></button>
        <button onClick={_=>this.roulete('next')}><MdArrowDown/></button>
        <button 
          onClick={this.toggleDefinition}><MdEye/></button>
        <button><MdAdd/></button>
        <button><MdRemove/></button>
        {this.props.children[this.state.showing]}
      </div>
    )
  }
}
