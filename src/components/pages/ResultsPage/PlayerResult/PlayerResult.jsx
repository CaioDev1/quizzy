import React from 'react'
import TeamIcon from '../../../TeamIcon/TeamIcon'
import './PlayerResultStyle.css'

function PlayerResult({username, score, team}) {
    return (
        <div className="player-result">
            <TeamIcon team={team} margin='0 5% 0 0' />
            <h3>{username}</h3>
            <h4 className="player-score">
                Total score <br/>
                <span>{score}</span>
            </h4>
        </div>
    )
}

export default PlayerResult