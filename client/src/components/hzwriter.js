import React from 'react';
import MdRfresh from 'react-ionicons/lib/MdRefresh'
import MdNext from 'react-ionicons/lib/IosArrowForward'
import MdPrev from 'react-ionicons/lib/IosArrowBack'
import HanziWriter from 'hanzi-writer'

export default class hzwriter extends React.Component {
    constructor(props) {
        super(props)
        this.writer = {}
        this.char = ''
        this.state = {
            charIndex: 0,
        };
    }
    componentDidMount(){
        var unit = this.props.unit
        this.quizChar(unit.char[0])
    }
    handleNextChar = () => {
        var unit = this.props.unit
        let charIndex = this.state.charIndex + 1 > unit.char.length - 1 ? 0 : this.state.charIndex + 1
        this.setState({ charIndex },
            () => this.quizChar(unit.char[this.state.charIndex])
        )
    }
    handlePrevChar = () => {
        var unit = this.props.unit
        let charIndex = this.state.charIndex - 1 < 0 ? unit.char.length - 1 : this.state.charIndex - 1
        this.setState({ charIndex },
            () => this.quizChar(unit.char[this.state.charIndex])
        )
    }
    quizChar = (char) => {
        fetch('/hanzi/' + char, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                //redraw char to delete the preious quiz result
                document.getElementById('hzchar').innerHTML = '<line x1="0" y1="0" x2="230" y2="230" stroke="#DDD" /><line x1="230" y1="0" x2="0" y2="230" stroke="#DDD" /><line x1="115" y1="0" x2="115" y2="230" stroke="#DDD" /><line x1="0" y1="115" x2="230" y2="115" stroke="#DDD" />'
                this.writer = HanziWriter.create('hzchar',
                    char, {
                    charDataLoader: (char, onComplete) => {
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
    handleReload = () => {
        this.writer.quiz()
    }
    render() {
        var unit = this.props.unit
        return (
            <div>
                <div className='writer__button__container'>
                    <button onClick={this.handleReload}>
                        <MdRfresh />
                    </button>

                    <button onClick={this.handlePrevChar}>
                        <MdPrev />
                    </button>
                    <button onClick={this.handleNextChar}>
                        <MdNext />
                    </button>
                </div>
                {unit.pronunciation[this.state.charIndex]}<br></br>

                <svg id="hzchar" xmlns="http://www.w3.org/2000/svg" width="230" height="230" >
                    <line x1="0" y1="0" x2="230" y2="230" stroke="#DDD" />
                    <line x1="230" y1="0" x2="0" y2="230" stroke="#DDD" />
                    <line x1="115" y1="0" x2="115" y2="230" stroke="#DDD" />
                    <line x1="0" y1="115" x2="230" y2="115" stroke="#DDD" />
                </svg>
            </div>
        )
    }
}