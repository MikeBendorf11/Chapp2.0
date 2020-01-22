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
      showing: 0
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
  render(){
    return(
      <div className="view-control-box">
        <button onClick={_=>this.roulete('prev')}><MdArrowUp/></button>
        <button onClick={_=>this.roulete('next')}><MdArrowDown/></button>
        <button><MdEye/></button>
        <button><MdAdd/></button>
        <button><MdRemove/></button>
        {this.props.children[this.state.showing]}
      </div>
    )
  }
}
