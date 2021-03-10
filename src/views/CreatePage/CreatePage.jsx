import React, {useState} from 'react'
import './CreatePageStyle.css'

import CreateQuestion from '../../components/pages/CreatePage/CreateQuestion/CreateQuestion'
import Button from '../../components/Button/Button'

function CreatePage() {
    let alternativeSchema = {
        title: '',
        alternatives: [{mark: 'A', content: '', correct: false}, {mark: 'B', content: '', correct: false}]
    }

    let [question, setQuestion] = useState([alternativeSchema])

    let [owner, setOwner] = useState('')
    let [topic, setTopic] = useState('')
    let [quizzCode, setQuizzCode] = useState('')
    let [isQuizzCreated, setIsQuizzCreated] = useState(false)

    function addNewQuestion() {
        setQuestion(preValue => {
            return [
                ...preValue,
                alternativeSchema
            ]
        })
    }

    function handleNewQuizzRequest(e) {
        e.preventDefault()

        setIsQuizzCreated(true)
    }

    return (
        <div className='container' id='create-page'>
            <h1>Sala de criação</h1>
            <main>
                <div className='create-question-container'>
                    {question.map((item, i) => {
                        return <CreateQuestion question={question} setQuestion={setQuestion} index={i} />
                    })}
                    <button id='add-question' onClick={addNewQuestion}>+</button>
                </div>
                <form id='create-question-menu' onSubmit={handleNewQuizzRequest}>
                    <div id='question-menu-rows'>
                        <input type="text" name="" id="" placeholder='Quizz de (ex: Caio Felipe)' value={owner} onChange={e => setOwner(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Tema (ex: Animais)' value={topic} onChange={e => setTopic(e.target.value)}  />
                        <h3>Perguntas: <strong>{question.length}</strong></h3>
                        <input type="text" name="" id="" placeholder='CÓDIGO GERADO' disabled={!isQuizzCreated} value={quizzCode} onChange={e => setQuizzCode(e.target.value)} />
                    </div>
                    <div id='question-menu-buttons'>
                        <Button to='/' color='#3EACEA'>VOLTAR</Button>
                        <Button type='button' buttonType='submit' color='#55EC3D'>{!isQuizzCreated ? 'CRIAR' : 'QUIZZ CRIADO'}</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default CreatePage