import React from 'react';
import units from './sample'
import Unit from './models/Unit'
import Search from './models/Search'
import { observer } from "mobx-react"
import Menu from './components/Menu'
import Review from './components/Review'
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css'
import ace from 'brace'
import 'brace/mode/json'
import 'brace/theme/github'
import Div100vh from 'react-div-100vh'

var log = console.log
//log(); console.clear()
var unit = new Unit(units[0])//,
var search = new Search(units)

@observer
class App extends React.Component {
  componentDidMount() {
    document.body.style.background = `url(/svg/${Math.floor(Math.random() * 9) + 1}.svg)`
    document.body.style.backgroundSize = 'cover'
    document.querySelectorAll('[class*=page]').forEach((elem,i)=>{
      if(i!==0) elem.style.display = "none"
    })
  }
  render() {
    return (
      <Div100vh>
        <div className="App" >
          <Menu search={search} />
          <Review unit={unit} />
          <div className="search__page">
            <Editor
              value={{}}
              onChange={this.handleChange}
              ace={ace}
              theme="ace/theme/kuroir"
              //schema={yourSchema}
            />
          </div>
        </div>
      </Div100vh> 
    );
  }
}

export default App;
