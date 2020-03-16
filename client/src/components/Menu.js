import React from 'react';
import SearchIcon from 'react-ionicons/lib/MdSearch'
import SentencesIcon from 'react-ionicons/lib/MdListBox'
import IchachaIcon from 'react-ionicons/lib/MdBook' //for ichacha
import MdBulb from 'react-ionicons/lib/MdBulb'
import IosCreate from 'react-ionicons/lib/IosCreate'
import MdbgIcon from '../images/mdbg-small.png'
import Swipe from './Swipe'
import Modal from 'react-modal';

var log = console.log 
log(); console.clear()

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     padding: 0//,
//     //width: '75%'
//   }
// };

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.state = {
      showModal: false,
      searchPhrase: '',
      results : []
    };
  }
  componentDidMount() {
    this.overlay = document.querySelector('.menu-overlay')
    this.element = document.querySelector('.menu-overlay>div')
    var swipe = new Swipe(this.element)
    swipe.onLeft(() => {
      this.hideMenu()
      //document.body.requestFullscreen();
    })
    swipe.onRight(() => {
      this.showMenu()
    })
    swipe.onUp(() => { })
    swipe.onDown(() => { })
    swipe.addListener()

  }
  hideMenu() {
    var container = document.querySelector('.menu-container')
    this.element.classList.remove('menu-open')
    this.overlay.style.visibility = 'hidden'
    container.style.backgroundColor = 'transparent'
    container.style.color = 'transparent'
  }
  showMenu() {
    var container = document.querySelector('.menu-container')
    this.element.classList.add('menu-open')
    this.overlay.style.visibility = 'visible'
    container.style.backgroundColor = 'rgba(240, 254, 240, 0.851)'
    container.style.color = 'black'
  }
  render() {
    var search = this.props.search,
        pages = this.props.pages
    return (
      <div className={'menu-overlay'} onClick={() => this.hideMenu()}>
        <div className={'menu-container'} >
          <div className={'menu-group-container'}>
            <div className={'menu-item-container'} onClick={_ => {
              pages.show(pages.review)
              this.setState({showModal: false})
            }}>
              <MdBulb color={'#495057'} className={'menu__icon'} />
              <span className={'menu__description'}>Review</span>
            </div>
            <div className={'menu-item-container'} onClick={_ => {
              this.setState({ showModal: true })
            }}>
              <SearchIcon color={'#495057'} className={'menu__icon'} />
              <span className={'menu__description'}>Search</span>
            </div>
            <div className={'menu-item-container'} onClick={_=>{
              pages.show(pages.editor)
              this.setState({showModal: false})
            }}>
            <IosCreate color={'#495057'} className={'menu__icon'} />
              <span className={'menu__description'}>Editor</span>
            </div>
            <div className={'menu-item-container'}>
              <img src={MdbgIcon} alt='' className={'menu__icon'} />
              <span className={'menu__description'}>Mdbg</span>
            </div>
            <div className={'menu-item-container'}>
              <IchachaIcon color={'#495057'} className={'menu__icon'} />
              <span className={'menu__description'}>Ichacha</span>
            </div>
            <div className={'menu-item-container'}>
              <SentencesIcon color={'#495057'} className={'menu__icon'} />
              <span className={'menu__description'}>Sentences</span>
            </div>

          </div>

        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={_ => this.setState({ showModal: false })}
          appElement={document.createElement('div')}
          contentLabel="Example Modal"
          //style={customStyles}
        > 
          <div className='modal--content'>
            <div className="input--search__container">
              <input className='input--search' onKeyUp={e=>{
                  if(e.target.value.trim()){
                    this.setState({ 
                      results: search.lookFor(e.target.value.trim())})}
                  }}> 
              </input>
            </div>
            <div className="search--result__contaner">{
            this.state.results.map((r,i)=>{
              return r.matches.map((m,j)=>{
                return <span 
                  key={j} 
                  className="search--result"
                  onClick={_=>{
                    pages.show(pages.editor)
                    search.currentUnit = search.units.filter(u=>u.id===r.id)
                    this.setState({showModal: false})
                  }}><sup><b>.</b></sup> {m}<br></br></span>
                })})}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
