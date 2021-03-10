import React from 'react'
import './AlternativeStyle.css'

function Alternative({mark, content, isCorrect, handleQuestionResult}) {
    function changeAlternativeColor(status) {
        switch(status) {
            case undefined:
                return ''
            case true:
                return 'correct'
            default:
                return 'wrong'
        }
    }

    return (
        <button className={`alternative ${changeAlternativeColor(isCorrect)}`} onClick={() => handleQuestionResult(mark)}>
            <span className='alternative-mark'>{mark}</span>
            <h3>{content}</h3>
        </button>
    )
}

export default Alternative