import React from 'react';

import HanziWriter from 'hanzi-writer'

export default class hzwriter extends React.Component {
  constructor(props) {
    super(props)
    this.writer = {}
  }
  componentDidMount() {
    var unit = this.props.unit
    this.quizChar(unit.hanzi[0])
  }
  quizChar = (hanzi) => {
    fetch('/hanzi/' + hanzi, { method: 'POST' })
      .then(resp => resp.json())
      .then(data => {
        //redraw hanzi to delete the preious quiz result
        document.getElementById('hzchar').innerHTML = '<line x1="0" y1="0" x2="230" y2="230" stroke="#DDD" /><line x1="230" y1="0" x2="0" y2="230" stroke="#DDD" /><line x1="115" y1="0" x2="115" y2="230" stroke="#DDD" /><line x1="0" y1="115" x2="230" y2="115" stroke="#DDD" />'
        this.writer = HanziWriter.create('hzchar',
          hanzi, {
          charDataLoader: (hanzi, onComplete) => {
            onComplete(data)
          },
          width: 230,
          height: 230,
          showCharacter: false,
          showOutline: false,
          showHintAfterMisses: 2,
          padding: 5
        })
        this.writer.quiz()
      })
  }
  render() {
    var unit = this.props.unit
    return (
      <div className="hzwriter__container">
        <svg id="hzchar" xmlns="http://www.w3.org/2000/svg" width="230" height="230" >
          <line x1="0" y1="0" x2="230" y2="230" stroke="#DDD" />
          <line x1="230" y1="0" x2="0" y2="230" stroke="#DDD" />
          <line x1="115" y1="0" x2="115" y2="230" stroke="#DDD" />
          <line x1="0" y1="115" x2="230" y2="115" stroke="#DDD" />
        </svg>
        <div className='hzwriter__links'>
          {unit.pinyin.map((p, i) => {
            return <div key={i} className={'link'}>&nbsp;&nbsp;<u><a href=" " onClick={e => { e.preventDefault()
                    this.quizChar(unit.hanzi[i])
              }}>{p}</a></u></div>
          })}
        </div>
      </div>
    )
  }
}