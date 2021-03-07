import React from 'react'
import Alternative from '../../components/pages/QuizzPage/Alternative/Alternative'

import './QuizzPageStyle.css'

function QuizzPage() {
    return (
        <div className="container" id="quizz-page">
            <header>
                <div id='progress-container'>
                    <h3>Questão 4 de 5</h3>
                    <div id='progress-bar'>
                        <div id='progress-bar-out'>
                            <div id="progress-bar-in" />
                        </div>
                    </div>
                    <span id='quizz-owner'>Quizz de <strong>Fernando</strong></span>
                </div>
                <div id="score">
                    <h3>
                        Score <br/>
                        <span>200</span>
                    </h3>
                </div>
            </header>
            <h1 id='quizz-title'>Que país ganhou mais olimpíadas ao longo da história?</h1>
            <div id="alternative-container">
                <Alternative mark='A' content='Estados Unidos' />
                <Alternative mark='B' content='China' />
                <Alternative mark='C' content='Brasil' />
                <Alternative mark='D' content='Dinamarca' />
            </div>
        </div>
    )
}

export default QuizzPage