import React from 'react'
import './PlayerResultStyle.css'

function PlayerResult({name, score, team}) {
    return (
        <div className="player-result">
            <div className="team-icon" style={{background: team}} />
            <h3>{name}</h3>
            <h4 className="player-score">
                Total score <br/>
                <span>{score}</span>
            </h4>
        </div>
    )
}

export default PlayerResult