import React, {useState} from 'react'
import './CreatePageStyle.css'

import CreateQuestion from '../../components/pages/CreatePage/CreateQuestion/CreateQuestion'
import Button from '../../components/Button/Button'

import Notification from '../../components/Notification/Notification'

import api from '../../API-CONFIG/API-CONFIG'

function CreatePage() {
    let alternativeSchema = {
        title: '',
        alternatives: [
            {mark: 'A', content: '', correct: false},
            {mark: 'B', content: '', correct: false}
        ]
    }

    let [questionList, setQuestionList] = useState([alternativeSchema])

    let [owner, setOwner] = useState('')
    let [theme, setTheme] = useState('')
    let [quizzId, setQuizzId] = useState('')
    let [isQuizzCreated, setIsQuizzCreated] = useState(false)
    let [buttonText, setButtonText] = useState('CRIAR')
    let [isError, setIsError] = useState({
        message: '',
        active: false,
    })


    function addNewQuestion() {
        setQuestionList(preValue => {
            return [
                ...preValue,
                alternativeSchema
            ]
        })
    }

    function handleNewQuizzRequest(e) {
        e.preventDefault()

        validadeForm()
    }

    function validadeForm() {
        if(owner.length && theme.length) {
            //validar se as questões e alternativas foram preenchidas corretamente
            let isFormOK = true

            for(let q of questionList) {
                if(q.title.length) {
                    let hasCorrect = false

                    for(let a of q.alternatives) {
                        if(a.correct) hasCorrect = true
                        if(!(a.content.length)) {
                            setIsError({
                                message: 'Texto da alternativa não preenchida corretamente',
                                active: true
                            })

                            isFormOK = false
                            break
                        }
                    }

                    if(!isFormOK) break // caso não tenha texto na alternativa (o isFormOK foi setado para false)

                    if(!hasCorrect) {
                        setIsError({
                            message: 'Selecione a alternativa correta da questão',
                            active: true
                        })

                        isFormOK = false
                        break
                    }
                } else {
                    setIsError({
                        message: 'Título da questão não preenchida',
                        active: true
                    })

                    isFormOK = false
                    break
                }
            }

            if(isFormOK) {
                createQuizz()
            }
        } else {
            setIsError({
                message: 'Informações do menu não preenchidas corretamente',
                active: true
            })
        }
    }

    function createQuizz() {
        setButtonText('CARREGANDO')
        
        api.post('/quizz/add', {
            owner,
            theme: theme,
            questions: questionList
        }).then(response => {
            setQuizzId(response.data.quizzId)

            setButtonText('CRIADO')

            setIsQuizzCreated(true)
        }).catch(err => {
            setIsError({
                message: err.response.data.message,
                active: true
            })
        })
    }

    return (
        <div className='container' id='create-page'>
            <h1>Sala de criação</h1>
            <main>
                <div className='create-question-container'>
                    {questionList.map((item, i) => {
                        return <CreateQuestion setQuestionList={setQuestionList} index={i} key={i} />
                    })}
                    <button id='add-question' onClick={addNewQuestion}>+</button>
                </div>
                <form id='create-question-menu' onSubmit={handleNewQuizzRequest}>
                    <div id='question-menu-rows'>
                        <input type="text" name="" id="" placeholder='Quizz de (ex: Caio Felipe)' value={owner} onChange={e => setOwner(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Tema (ex: Animais)' value={theme} onChange={e => setTheme(e.target.value)}  />
                        <h3>Perguntas: <strong>{questionList.length}</strong></h3>
                        <input type="text" name="" id="" placeholder='CÓDIGO GERADO' disabled={!isQuizzCreated} value={quizzId} onChange={e => setQuizzId(e.target.value)} />
                    </div>
                    <div id='question-menu-buttons'>
                        <Button to='/' color='#3EACEA'>VOLTAR</Button>
                        <Button type='button' buttonType='submit' disabled={isQuizzCreated} color='#55EC3D'>{buttonText}</Button>
                    </div>
                </form>
            </main>
            {isError.active && <Notification message={isError.message} setIsError={setIsError} active={isError.active} />}
        </div>
    )
}

export default CreatePage