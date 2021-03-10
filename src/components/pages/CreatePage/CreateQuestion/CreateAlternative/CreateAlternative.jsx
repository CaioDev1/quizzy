import React from 'react'

function CreateAlternative({mark, content, selected, setQuestionValue, setCorrectAlternative}) {

    return (
        <div className='create-question-alternative-field'>
            <button className={`create-question-alternative-button ${selected ? 'selected' : ''}`} onClick={() => {setCorrectAlternative(mark)}}>{mark}</button>
            <input type="text" name="" id="" value={content} onChange={e => {setQuestionValue(mark, e.target.value)}} className='create-question-alternative' placeholder='TEXTO DA ALTERNATIVA'/>
        </div>
    )
}

export default CreateAlternative