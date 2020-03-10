import React from 'react';
import { observer } from "mobx-react"
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

//import './JSONEditorDemo.css';

var log = console.log
log(); console.clear()

@observer
class Editor extends React.Component {
  componentDidMount () {
    const options = {
      mode: 'form',
      onChange: this.onChange
    };
    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(this.props.unit);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }
  componentDidUpdate() {
    this.jsoneditor.update(this.props.unit);
    this.jsoneditor.expandAll()
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