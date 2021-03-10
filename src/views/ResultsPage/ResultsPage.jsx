import React from 'react'

import Button from '../../components/Button/Button'
import EstatisticBar from '../../components/pages/ResultsPage/EstatisticBar/EstatisticBar'
import PlayerResult from '../../components/pages/ResultsPage/PlayerResult/PlayerResult'

import './ResultsPageStyle.css'

import {Slide, Grow} from '@material-ui/core'

function ResultsPage() {
    return (
        <div className="container" id="results-page">
            <h1>Resultados</h1>
            <div id="estatistics-container">
                {[100, 75, 50].map((v, i) => {
                    return <EstatisticBar percentage={v} place={i + 1} />
                })}
            </div>
            <Slide direction='left' in mountOnEnter timeout={600}><h1 id="winner-team">🎉Time <span>Wikipedia</span> liderando!🎉</h1></Slide>
            <Grow in mountOnEnter timeout={700}>
                <div id="results-container">
                    {[
                        {name: 'Caio Felipe', score: 2000, team: 'red'},
                        {name: 'Jorginho', score: 1500, team: 'blue'},
                        {name: 'Laura Silva', score: 1000, team: 'blue'},
                    ].map(v => {
                        return <PlayerResult name={v.name} score={v.score} team={v.team} />
                    })}
                </div>
            </Grow>
            <Button to='/' color='#343330'>VOLTAR</Button>
        </div>
    )
}

export default ResultsPage