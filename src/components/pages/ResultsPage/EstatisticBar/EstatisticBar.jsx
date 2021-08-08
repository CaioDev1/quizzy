import React, {useEffect, useState} from 'react'
import './EstatisticBarStyle.css'

function EstatisticBar({place, percentage}) {
    let [transition, setTransition] = useState(0)

    useEffect(() => {
        setTransition(percentage)
    })

    return (
        <div className="estatistic-bar" style={{width: `${transition}%`}}>
            <h3>{place}° LUGAR - {percentage}%</h3>
        </div>
    )
}

export default EstatisticBar