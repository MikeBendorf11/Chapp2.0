import React from 'react';
import { observer } from "mobx-react"
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

var log = console.log
log(); console.clear()

@observer
class Editor extends React.Component {
  componentDidMount () {
    const options = {
      mode: 'form',
      onChange: this.onChange
    }
    this.jsoneditor = new JSONEditor(this.container, options)
    this.jsoneditor.set(this.props.unit)
    this.jsoneditor.expandAll()
    this.focusSearchInput()
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy()
    }
  }
  componentDidUpdate() {
    this.jsoneditor.update(this.props.unit)
    this.jsoneditor.expandAll()
    this.focusSearchInput()
  }
  focusSearchInput(){
    if(!this.props.search.query) return
    var input = document.querySelector('.jsoneditor-frame > input')
    input.value = this.props.search.query
    input.focus()
    input.click()
    input.dispatchEvent(new KeyboardEvent('keyup', {'key':'y'}));
  }
  onChange=()=>{
    log(this.jsoneditor.get())
  }
  render() {
    return (
      <div className="editor__page" ref={elem => this.container = elem}/>
    )
  }
}

export default Editor