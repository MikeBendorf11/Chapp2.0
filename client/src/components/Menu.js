import React from 'react';
import SearchIcon from 'react-ionicons/lib/MdSearch'
import SentencesIcon from 'react-ionicons/lib/MdListBox'
import IchachaIcon from 'react-ionicons/lib/MdBook' //for ichacha
import MdBulb from 'react-ionicons/lib/MdBulb'
import MdbgIcon from '../images/mdbg-small.png'
import Swipe from './Swipe'


export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.hideMenu = this.hideMenu.bind(this)
    this.showMenu = this.showMenu.bind(this)
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
  hideAllPages() {
    document.querySelectorAll('[class*=page]').forEach((elem, i) => {
      elem.style.display = "none"
    })
  }
  showPage(page) {
    document.querySelector(page).style.display = 'block'
  }
  render() {
    return (
      <div className={'menu-overlay'} onClick={() => this.hideMenu()}>
        <div className={'menu-container'} >
          <div className={'menu-item-container'}  onClick={_ => {
            this.hideAllPages(); this.showPage('.review__page')
          }}>
            <MdBulb color={'#495057'} className={'menu__icon'} />
            <span className={'menu__description'}>Review</span>
          </div>
          <div className={'menu-item-container'} onClick={_ => {
            this.hideAllPages(); this.showPage('.search__page')
          }}>
            <SearchIcon color={'#495057'} className={'menu__icon'} /> 
            <span className={'menu__description'}>Search</span>
          </div>
          <div className={'menu-item-container'}>
            <img src={MdbgIcon} className={'menu__icon'} />
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


    )
  }
}
