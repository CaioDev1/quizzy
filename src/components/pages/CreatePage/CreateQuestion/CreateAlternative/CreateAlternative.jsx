import React from 'react'

function CreateAlternative({mark, content, selected, setQuestionValue, setCorrectAlternative, handleDeleteAlternative}) {

    return (
        <div className='create-question-alternative-field'>
            <button className={`create-question-alternative-button ${selected ? 'selected' : ''}`} onClick={() => {setCorrectAlternative(mark)}}>{mark}</button>
            <input type="text" name="" id="" value={content} onChange={e => {setQuestionValue(mark, e.target.value)}} className='create-question-alternative' placeholder='TEXTO DA ALTERNATIVA'/>
            {
                ['A', 'B'].indexOf(mark) == -1 && <button className='create-question-alternative-delete-button' onClick={() => {handleDeleteAlternative(mark)}}>X</button>
            }  
        </div>
    )
}

export default CreateAlternative