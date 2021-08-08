import React from 'react'
import './TeamIconStyle.css'


function TeamIcon({team, height, width, margin}) {
    return (
        <div className="team-icon" style={{
            background: team == 'wikipedia' ? 'blue' : 'red',
            margin: margin ? margin : 'initial',
            height: height ? height : '50px',
            width: width ? width : '50px',
        }}>
            <img src={process.env.PUBLIC_URL + (team == 'wikipedia' ? '/Wikipedia_Logo.png' : '/Brain_Logo.png')} />
        </div>
    )
}

export default TeamIcon