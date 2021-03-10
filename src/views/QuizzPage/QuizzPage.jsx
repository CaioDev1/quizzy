import React, {useState, useEffect} from 'react'

import Alternative from '../../components/pages/QuizzPage/Alternative/Alternative'

import {Redirect} from 'react-router-dom'

import {Fade} from '@material-ui/core'

import './QuizzPageStyle.css'

function QuizzPage() {
    let [isTransitionActive, setIsTransitionActive] = useState(true)

    let [currentQuestion, setCurrentQuestion] = useState(0)

    let [isQuizzCompleted, setIsQuizzCompleted] = useState(false)

    let [userScore, setUserScore] = useState(0)

    let [exQuestion, setExQuestions] = useState([
        {
            title: 'Qual o maior país do mundo',
            alternatives: [
                {mark: 'A', content: 'cajueiro seco', isCorrect: undefined}, 
                {mark: 'B', content: 'iputinga', isCorrect: undefined}
            ]
        },
        {
            title: 'Quantas formigas tem no mundo',
            alternatives: [
                {mark: 'A', content: '5', isCorrect: undefined}, 
                {mark: 'B', content: '10', isCorrect: undefined}
            ]
        },
    ])

    function handleQuestionResult(mark) {
        document.querySelectorAll('.alternative').forEach(button => {
            button.disabled = true
        })

        new Promise(resolve => {
            setTimeout(() => resolve(), 200)
        }).then(() => {
            let resultsFromAPI = {
                correctAnswer: true,
                points: 200,
                alternatives: {
                    A: true,
                    B: false
                }
            }

            setExQuestions(preValue => {
                let updatedQuestionResult = preValue
                updatedQuestionResult[currentQuestion].alternatives.map(item => {
                    item.isCorrect = resultsFromAPI.alternatives[item.mark]
                })

                return [...updatedQuestionResult]
            })

            setUserScore(preValue => {
                return preValue + resultsFromAPI.points
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
        if(exQuestion.length && exQuestion[0].alternatives[0].isCorrect != undefined) { // trocar para só o exQuestion.length quando implementar a api 
            nextQuestionTransition().then(() => {
                setCurrentQuestion(preValue => {
                    if(preValue + 1 == exQuestion.length) {
                        setIsQuizzCompleted(true)

                        return preValue
                    }
                    
                    return preValue + 1
                })

                setIsTransitionActive(true)
            })
        }
    }, [exQuestion])

    return (
        <div className="container" id="quizz-page">
            <header>
                <div id='progress-container'>
                    <h3>Questão {currentQuestion + 1} de {exQuestion.length}</h3>
                    <div id='progress-bar'>
                        <div id='progress-bar-out'>
                            <div id="progress-bar-in" style={{width: `${((currentQuestion + 1) * 100) / exQuestion.length}%`}} />
                        </div>
                    </div>
                    <span id='quizz-owner'>Quizz de <strong>Fernando</strong></span>
                </div>
                <div id="score">
                    <h3>
                        Score <br/>
                        <Fade in={isTransitionActive} timeout={300} mountOnEnter unmountOnExit><span>{userScore}</span></Fade>
                    </h3>
                </div>
            </header>
            { exQuestion.length &&
                <Fade in={isTransitionActive} timeout={300} mountOnEnter unmountOnExit>
                    <main>
                        <h1 id='quizz-title'>{exQuestion[currentQuestion].title}</h1>
                        <div id="alternative-container">
                            {exQuestion[currentQuestion].alternatives.map(item => {
                                return <Alternative mark={item.mark} content={item.content} isCorrect={item.isCorrect} handleQuestionResult={handleQuestionResult} />
                            })}
                        </div>
                    </main>
                </Fade>
            }
            {
                isQuizzCompleted && <Redirect to='/results' />    
            }
        </div>
    )
}

export default QuizzPage