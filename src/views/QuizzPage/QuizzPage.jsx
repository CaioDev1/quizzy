import React, {useState, useEffect, useContext} from 'react'

import Alternative from '../../components/pages/QuizzPage/Alternative/Alternative'

import {Redirect} from 'react-router-dom'

import {Fade} from '@material-ui/core'

import './QuizzPageStyle.css'

import Notification from '../../components/Notification/Notification'

import {useParams} from 'react-router-dom'

import api from '../../API-CONFIG/API-CONFIG'

import CurrentPlayerIdContext from '../../Contexts'

function QuizzPage() {
    let [isTransitionActive, setIsTransitionActive] = useState(true)

    let [currentQuestion, setCurrentQuestion] = useState(0)

    let [isQuizzCompleted, setIsQuizzCompleted] = useState(false)

    let [userScore, setUserScore] = useState(0)

    let {quizzId} = useParams()

    let [currentPlayerId, setCurrentPlayerId] = useContext(CurrentPlayerIdContext)

    let [isError, setIsError] = useState({
        message: '',
        active: false,
    })

    let [quizz, setQuizz] = useState({
        owner: '',
        theme: '',
        questionNum: 0,
        questions: []
    })

    useEffect(() => {
        api.get(`/quizz/${quizzId}`).then(response => {
            setQuizz(response.data)
        }).catch(err => {
            setIsError({
                message: err.message, 
                active: true
            })
        })
    }, [])

    function handleQuestionResult(mark) {
        document.querySelectorAll('.alternative').forEach(button => {
            button.disabled = true
        })

        api.patch(`/player/send-answer?questionId=${quizz.questions[currentQuestion].questionId}&quizzId=${quizzId}&playerId=${currentPlayerId}&chosenAlternative=${mark}`).then(response => {
            setQuizz(preValue => {
                let updatedQuestionResult = preValue

                updatedQuestionResult.questions[currentQuestion].alternatives.map(item => {
                    item.isCorrect = response.data.correctAlternative == item.mark

                    return item
                })

                return {...updatedQuestionResult}
            })

            setUserScore(preValue => {
                return preValue + response.data.score
            })
        }).catch(err => {
            setIsError({
                message: err.message, 
                active: true
            })
        })
    }

    function nextQuestionTransition() {
        return new Promise (resolve => {
            setTimeout(() => { // tempo extra pra visualizar a resposta
                setIsTransitionActive(false)
                setTimeout(() => resolve(), 300) // espera a transição de desaparecer concluir
            }, 800)
        })
    }
    
    // TRANSICIONA, TROCA AS QUESTÕES E REDIRECIONA PARA OS RESULTADOS QUANDO ACABA
    useEffect(() => {
        // quando o fetch da api foi feito e pra quando as alterações das alternativas já foram feitas quando clica
        if(quizz.questions.length && quizz.questions[currentQuestion].alternatives[0].isCorrect != null) {
            nextQuestionTransition().then(() => {
                setCurrentQuestion(preValue => {
                    if(preValue + 1 == quizz.questions.length) {
                        setIsQuizzCompleted(true)

                        return preValue
                    }
                    
                    return preValue + 1
                })

                setIsTransitionActive(true)
            })
        }
    }, [quizz])

    return (
        <div className="container" id="quizz-page">
            <header>
                <div id='progress-container'>
                    <h3>Questão {currentQuestion + 1} de {quizz.questions.length}</h3>
                    <div id='progress-bar'>
                        <div id='progress-bar-out'>
                            <div id="progress-bar-in" style={{width: `${((currentQuestion + 1) * 100) / quizz.questions.length}%`}} />
                        </div>
                    </div>
                    <span id='quizz-owner'>Quizz de <strong>{quizz.owner}</strong></span>
                </div>
                <div id="score">
                    <h3>
                        Score <br/>
                        <Fade in={isTransitionActive} timeout={300} mountOnEnter unmountOnExit><span>{userScore}</span></Fade>
                    </h3>
                </div>
            </header>
            {quizz.questions.length &&
                <Fade in={isTransitionActive} timeout={300} mountOnEnter unmountOnExit>
                    <main>
                        <h1 id='quizz-title'>{quizz.questions[currentQuestion].title}</h1>
                        <div id="alternative-container">
                            {quizz.questions[currentQuestion].alternatives.map(item => {
                                return <Alternative mark={item.mark} content={item.content} isCorrect={item.isCorrect} handleQuestionResult={handleQuestionResult} />
                            })}
                        </div>
                    </main>
                </Fade>
            }
            {isError.active && <Notification message={isError.message} setIsError={setIsError} active={isError.active} />}
            {isQuizzCompleted && <Redirect to={`/quizz/${quizzId}/results`} />}
        </div>
    )
}

export default QuizzPage