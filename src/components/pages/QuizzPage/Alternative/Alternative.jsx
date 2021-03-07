import React from 'react'
import './AlternativeStyle.css'

function Alternative({mark, content}) {
    return (
        <button className="alternative">
            <span className='alternative-mark'>{mark}</span>
            <h3>{content}</h3>
        </button>
    )
}

export default Alternative