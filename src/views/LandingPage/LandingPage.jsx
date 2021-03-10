import React, {useState} from 'react'
import './LandingPageStyle.css'

import Button from '../../components/Button/Button'
import { Redirect } from 'react-router'

function LandingPage() {
    let [username, setUsername] = useState('')
    let [quizzCode, setQuizzCode] = useState(null)
    let [isSubmitComplete, setIsSubmitComplete] = useState(false)

    let [chosenTeam, setChosenTeam] = useState({
        sabidos: false,
        wikipedia: false
    })

    function handleTeamSelection(team) {
        setChosenTeam(preValue => {
            Object.keys(preValue).map(t => preValue[t] = false)

            return {
                ...preValue,
                [team]: true
            }
        })
    }

    function handleUserSubmit(e) {
        e.preventDefault()

        setIsSubmitComplete(true)
    }

    return (
        <div className="container" id='landing-page'>
            <div id='title'>
                <h1>QUIZZY</h1>
                <h3>Crie quizzes e desafie seus amigos!</h3>
            </div>
            <form action="" onSubmit={handleUserSubmit}>
                <fieldset id='inputs'>
                    <input type="text" name="" id="" value={username} onChange={e => {setUsername(e.target.value)}} placeholder='NOME' />
                    <input type="number" name="" id="" value={quizzCode} onChange={e => {setQuizzCode(e.target.value)}} placeholder='CÓDIGO' />
                </fieldset>
                <fieldset id='teams'>
                    <div id='team-sabidos' className={chosenTeam.sabidos ? 'selected' : ''} onClick={() => {handleTeamSelection('sabidos')}}>
                        <span id='team-sabidos-circle'></span>
                        <p>TIME SABIDOS</p>
                    </div>
                    <div id='team-wikipedia' className={chosenTeam.wikipedia ? 'selected' : ''}  onClick={() => {handleTeamSelection('wikipedia')}}>
                        <span id='team-wikipedia-circle'></span>
                        <p>TIME WIKIPEDIA</p>
                    </div>
                </fieldset>
                <Button type='button' buttonType="submit" color='#28D439'>ENTRAR</Button>
            </form>
            <Button to='/create' color='#343330'>CRIAR SEU QUIZZ</Button>
            {isSubmitComplete && <Redirect to='/quizz' />}
        </div>
    )
}

export default LandingPage