import React from 'react';
import units from './sample2'
import Unit from './models/Unit'
import Search from './models/Search'
import Pages from './models/Pages'
import { observer } from "mobx-react"
import Menu from './components/Menu'
import Review from './components/Review'
import Editor from './components/Editor'
import Div100vh from 'react-div-100vh'

var log = console.log
log(); console.clear()

var unit = new Unit(units[608]),
    search = new Search(units),
    pages = new Pages()

pages.current = pages.review

@observer
class App extends React.Component {
  componentDidMount() {
    document.body.style.background = `url(/svg/${Math.floor(Math.random() * 9) + 1}.svg)`
    document.body.style.backgroundSize = 'cover'
    pages.show(pages.review)
  }
  render() {
    //log(search.openUnit)
    return (
      <Div100vh>
        <div className="App" >
          <Menu search={search} pages={pages}/>
          <Review unit={unit} pages={pages}/>
          {/* Unit prop helps ace reload */}
          <Editor unit={search.currentUnit} search={search}/>
        </div>
      </Div100vh> 
    )
  }
}

export default App;
