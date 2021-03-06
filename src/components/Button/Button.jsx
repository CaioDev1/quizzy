import React from 'react'
import './ButtonStyle.css'

import {Link} from 'react-router-dom'

function Button({type='link', to='', children, color, buttonType='button'}) {
    return type == "button" ? (
        <button className='button' type={buttonType} style={{backgroundColor: color}}>{children}</button>
    ) :
    (
        <Link to={to} className='button' style={{backgroundColor: color}}>{children}</Link>
    )
}

export default Button