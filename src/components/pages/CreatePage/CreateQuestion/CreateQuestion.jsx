import React, {useState, useEffect} from 'react'
import './CreateQuestionStyle.css'

import CreateAlternative from './CreateAlternative/CreateAlternative'

function CreateQuestion({setQuestionList, index}) {
    let [question, setQuestion] = useState({
        title: '',
        alternatives: [
            {mark: 'A', content: '', correct: false},
            {mark: 'B', content: '', correct: false}
        ]
    })

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
        teste.alternatives = question.alternatives.length < 4 ?
            [
                ...question.alternatives,
                {
                    mark: setQuestionMark(question.alternatives.length),
                    content: '',
                    correct: false
                }
            ] :
            question.alternatives

        setQuestion(preValue => {
            return {...preValue} // o problema é aq
        })
    }

    function setQuestionValue(mark, content) {
        let updatedAlternative = question.alternatives.map(item => {
            if(item.mark == mark) {
                item.content = content
            }

            return item
        })
            
        setQuestion(preValue => {
            preValue.alternatives = updatedAlternative
            
            return {...preValue}
        })
    }

    function setCorrectAlternative(mark) {
        let updatedCorrectAlternative = question.alternatives.map(item => {
            if(item.mark == mark) {
                item.correct = !item.correct
            } else {
                item.correct = false
            }

            return item
        })


        setQuestion(preValue => {
            preValue.alternatives = updatedCorrectAlternative
            
            return {...preValue}
        })
    }

    function handleDeleteAlternative(mark) {
        // exclue a alternativa do array
        let updatedAlternativesWithDelete = question.alternatives.filter(item => {
            return item.mark != mark
        })

        // MUDA A ALTERNATIVA "D" PARA "C" CASO O "C" SEJA EXCLUIDO
        updatedAlternativesWithDelete = updatedAlternativesWithDelete.map((item, i) => {
            if(item.mark == 'D' && updatedAlternativesWithDelete.length == 3) { 
                item.mark = 'C'
            }

            return item
        })

        setQuestion(preValue => {
            preValue.alternatives = updatedAlternativesWithDelete

            return {...preValue}
        })
    }

    function handleQuestionTitle(e) {
        setQuestion(preValue => {
            preValue.title = e.target.value
            
            return {...preValue}
        })
    }

    useEffect(() => {
        setQuestionList(preValue => {
            preValue[index] = question

            return [...preValue]
        })
    }, [question])

    return (
        <div className='create-question'>
            <input type="text" name="" id="" placeholder='PERGUNTA' onChange={handleQuestionTitle} />
            <div className='create-question-alternatives-container'>
                {question.alternatives.map((item, i) => {
                    return (
                        <CreateAlternative 
                            mark={item.mark} 
                            content={item.content}
                            selected={item.correct}
                            setQuestionValue={setQuestionValue} 
                            setCorrectAlternative={setCorrectAlternative}
                            handleDeleteAlternative={handleDeleteAlternative}
                            key={i}
                        />
                    )
                })}
                {question.alternatives.length <= 3 &&
                    <button className='add-alternative-button' onClick={handleNewAlternative}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                        </svg>
                    </button>
                }
            </div>
        </div>
    )
}

export default CreateQuestion