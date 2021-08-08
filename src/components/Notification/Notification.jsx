import React, {useEffect, useState} from 'react'
import './NotificationStyle.css'

import {Fade} from '@material-ui/core'

function Notification({message, setIsError, active}) {
    let [isSetted, setIsSetted] = useState(false)

    useEffect(() => {
        if(isSetted) {
            setTimeout(() => setIsError({message: '', active: false}), 2500)
        } else {
            setIsSetted(true)
        }
    })

    return (
        <Fade in={active} timeout={300} mountOnEnter unmountOnExit>
            <div className="notification">
                <h4>{message}</h4>
            </div>
        </Fade>
    )
}

export default Notification