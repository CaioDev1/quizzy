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

    let [redirect, setRedirect] = useState({
        active: false,
        to: ''
    })

    let [userScore, setUserScore] = useState(0)

    let {quizzId} = useParams()

    let [currentPlayerId, setCurrentPlayerId] = useContext(CurrentPlayerIdContext)

    let [isAutorized, setIsAutorized] = useState(false)

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
                message: err.response.data.message, 
                active: true
            })
        })
    }, [])

    function handleQuestionResult(mark) {
        document.querySelectorAll('.alternative').forEach(button => {
            button.disabled = true
        })

        isAutorized &&
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
                message: err.response.data.message, 
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
                        setCurrentPlayerId('')
                        setRedirect({
                            active: true,
                            to: `/quizz/${quizzId}/results`
                        })

                        return preValue
                    }
                    
                    return preValue + 1
                })

                setIsTransitionActive(true)
            })
        }
    }, [quizz])

    useEffect(() => {
        if(currentPlayerId == '') {
            setIsError({
                message: 'Jogador não cadastrado.', 
                active: true
            })

            setTimeout(() => {
                setRedirect({
                    active: true,
                    to: '/'
                })
            }, 2000)
        } else {
            setIsAutorized(true)
        }
    }, [])

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
            {isAutorized && quizz.questions.length &&
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
            {redirect.active && <Redirect to={redirect.to} />}
        </div>
    )
}

export default QuizzPage