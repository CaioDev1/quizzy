import React from 'react'

import CreateAlternative from './CreateAlternative/CreateAlternative'

function CreateQuestion() {
    return (
        <div className='create-question'>
            <input type="text" name="" id="" placeholder='PERGUNTA' />
            <div className='create-question-alternatives-container'>
                <CreateAlternative />
                <CreateAlternative />
                <button className='add-alternative-button'>+</button>
            </div>
        </div>
    )
}

export default CreateQuestion