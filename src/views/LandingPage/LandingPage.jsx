import React from 'react'
import './LandingPageStyle.css'

import Button from '../../components/Button/Button'

function LandingPage() {
    return (
        <div className="container" id='landing-page'>
            <div id='title'>
                <h1>QUIZZY</h1>
                <h3>Crie quizzes e desafie seus amigos!</h3>
            </div>
            <form action="">
                <fieldset id='inputs'>
                    <input type="text" name="" id="" placeholder='NOME' />
                    <input type="number" name="" id="" placeholder='CÓDIGO' />
                </fieldset>
                <fieldset id='teams'>
                    <div id='team-sabidos'>
                        <span id='team-sabidos-circle'></span>
                        <p>TIME SABIDOS</p>
                    </div>
                    <div id='team-wikipedia'>
                    <span id='team-wikipedia-circle'></span>
                        <p>TIME WIKIPEDIA</p>
                    </div>
                </fieldset>
                <Button type='button' buttonType="submit" color='#28D439'>ENTRAR</Button>
            </form>
            <Button to='/create' color='#343330'>CRIAR SEU QUIZZ</Button>
        </div>
    )
}

export default LandingPage