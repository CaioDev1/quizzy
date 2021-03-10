import React, {useState} from 'react'
import './CreateQuestionStyle.css'

import CreateAlternative from './CreateAlternative/CreateAlternative'

function CreateQuestion({question, setQuestion, index}) {
    

    function setQuestionMark(length) {
        switch(length) {
            case 2: 
                return 'C'
            case 3:
                return 'D'
            default:
                throw new Error('Length greater than 4 is not accepted.')
        }
    }

    function handleNewAlternative() {
        let teste = question
        teste[index].alternatives = question[index].alternatives.length < 4 ?
            [
                ...question[index].alternatives,
                {
                    mark: setQuestionMark(question[index].alternatives.length),
                    content: '',
                    correct: false
                }
            ] :
            question[index].alternatives

        setQuestion([...teste])
    }

    function setQuestionValue(mark, content) {
        let updatedAlternative = question[index].alternatives.map(item => {
            if(item.mark == mark) {
                item.content = content
            }

            return item
        })
            
        setQuestion(preValue => {
            preValue[index].alternatives = updatedAlternative
            
            return [...preValue]
        })
    }

    function setCorrectAlternative(mark) {
        let updatedCorrectAlternative = question[index].alternatives.map(item => {
            if(item.mark == mark) {
                item.correct = !item.correct
            } else {
                item.correct = false
            }

            return item
        })


        setQuestion(preValue => {
            preValue[index].alternatives = updatedCorrectAlternative
            
            return [...preValue]
        })
    }

    function handleQuestionTitle(e) {
        setQuestion(preValue => {
            preValue[index] = {
                title: e.target.value,
                alternatives: question[index].alternatives
            }
            
            return [...preValue]
        })
    }

    return (
        <div className='create-question'>
            <input type="text" name="" id="" placeholder='PERGUNTA' onChange={handleQuestionTitle} />
            <div className='create-question-alternatives-container'>
                {question[index].alternatives.map((item, i) => {
                    return (
                        <CreateAlternative 
                            mark={item.mark} 
                            content={item.content}
                            selected={item.correct}
                            setQuestionValue={setQuestionValue} 
                            setCorrectAlternative={setCorrectAlternative}
                        />
                    )
                })}
                {question[index].alternatives.length <= 3 &&
                    <button className='add-alternative-button' onClick={handleNewAlternative}>+</button>
                }
            </div>
        </div>
    )
}

export default CreateQuestion