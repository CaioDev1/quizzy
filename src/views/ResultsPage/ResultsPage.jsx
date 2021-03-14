import React, {useEffect, useState} from 'react'

import Button from '../../components/Button/Button'
import EstatisticBar from '../../components/pages/ResultsPage/EstatisticBar/EstatisticBar'
import PlayerResult from '../../components/pages/ResultsPage/PlayerResult/PlayerResult'

import './ResultsPageStyle.css'

import {Slide, Grow} from '@material-ui/core'

import {useParams} from 'react-router-dom'

import api from '../../API-CONFIG/API-CONFIG'

import Notification from '../../components/Notification/Notification'

function ResultsPage() {
    let {quizzId} = useParams()

    let [results, setResults] = useState({
        players: [],
        questionNum: 0,
        leaderingTeam: ''
    })

    let [isError, setIsError] = useState({
        message: '',
        active: false,
    })

    useEffect(() => {
        api.get(`/quizz/${quizzId}/results`).then(response => {
            setResults(response.data)
        }).catch(err => {
            setIsError({
                message: err.message, 
                active: true
            })
        })
    }, [])

    return (
        <div className="container" id="results-page">
            <h1>Resultados</h1>
            <div id="estatistics-container">
                {results.players.length &&
                    [...Array(5)].map((v, i) => {
                        return <EstatisticBar percentage={(results.players[i].score * 100) / (results.questionNum * 200)} place={i + 1} />
                    })
                }
            </div>
            {   results.leaderingTeam !== '' &&
                <Slide direction='left' in mountOnEnter timeout={600}><h1 id="winner-team">🎉Time <span>{results.leaderingTeam}</span> liderando!🎉</h1></Slide>
            }
            <Grow in mountOnEnter timeout={700}>
                <div id="results-container">
                    {results.players.map(v => {
                        return <PlayerResult username={v.username} score={v.score} team={v.team} />
                    })}
                </div>
            </Grow>
            <Button to='/' color='#343330'>VOLTAR</Button>
            {isError.active && <Notification message={isError.message} setIsError={setIsError} active={isError.active} />}
        </div>
    )
}

export default ResultsPage