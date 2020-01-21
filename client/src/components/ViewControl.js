import React from 'react';


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
    log(this.props.children[0])
  }
  render(){
    return(
      <div className="view-control-box">
        {this.props.children[0]}
      </div>
    )
  }
}