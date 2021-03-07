import React from 'react'
import './EstatisticBarStyle.css'

function EstatisticBar({place, percentage}) {
    return (
        <div className="estatistic-bar" style={{width: `${percentage}%`}}>
            <h3>{place}° LUGAR - {percentage}%</h3>
        </div>
    )
}

export default EstatisticBar