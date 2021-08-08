import React, {useState, useContext, useEffect} from 'react'
import './LandingPageStyle.css'

import Button from '../../components/Button/Button'
import { Redirect } from 'react-router'

import Notification from '../../components/Notification/Notification'
import TeamIcon from '../../components/TeamIcon/TeamIcon'

import api from '../../API-CONFIG/API-CONFIG'

import CurrentPlayerIdContext from '../../Contexts'

function LandingPage() {
    let [username, setUsername] = useState('')
    let [quizzId, setQuizzCode] = useState(null)
    let [isSubmitComplete, setIsSubmitComplete] = useState(false)
    let [isError, setIsError] = useState({
        message: '',
        active: false,
    })

    let [chosenTeam, setChosenTeam] = useState({
        sabidos: false,
        wikipedia: false
    })

    let [currentPlayerId, setCurrentPlayerId] = useContext(CurrentPlayerIdContext)

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

        validateForm()
    }

    function validateForm() {
        document.querySelector('form button[type=submit]').textContent = 'CARREGANDO'

        if(username.length && quizzId && (chosenTeam.sabidos || chosenTeam.wikipedia)) {
            api.post('/player/add', {
                username,
                quizzId,
                team: chosenTeam.sabidos ? 'sabidos' : 'wikipedia'
            }).then(response => {
                setCurrentPlayerId(response.data.playerId)

                setIsSubmitComplete(true)
            }).catch(err => {
                setIsError({
                    message: err.response.data.message, 
                    active: true
                })
            })
        } else {
            setIsError({
                message: 'Campos não preenchidos!', 
                active: true
            })
        }
    }

    useEffect(() => {
        if(isError) {
            document.querySelector('form button[type=submit]').textContent = 'ENTRAR'
        }
    }, [isError])

    return (
        <div className="container" id='landing-page'>
            <div id='title'>
                <h1>QUIZZY</h1>
                <h3>Crie quizzes e desafie seus amigos!</h3>
            </div>
            <form action="" onSubmit={handleUserSubmit}>
                <fieldset id='inputs'>
                    <input type="text" name="" id="" value={username} onChange={e => {setUsername(e.target.value)}} placeholder='NOME' />
                    <input type="number" name="" id="" value={quizzId} onChange={e => {setQuizzCode(e.target.value)}} placeholder='CÓDIGO' />
                </fieldset>
                <fieldset id='teams'>
                    <div id='team-sabidos' className={chosenTeam.sabidos ? 'selected' : ''} onClick={() => {handleTeamSelection('sabidos')}}>
                        <TeamIcon team='sabidos' height='70px' width='70px' />
                        <p>TIME SABIDOS</p>
                    </div>
                    <div id='team-wikipedia' className={chosenTeam.wikipedia ? 'selected' : ''}  onClick={() => {handleTeamSelection('wikipedia')}}>
                        <TeamIcon team='wikipedia' height='70px' width='70px' />
                        <p>TIME WIKIPEDIA</p>
                    </div>
                </fieldset>
                <Button type='button' buttonType="submit" color='#28D439'>ENTRAR</Button>
            </form>
            <Button to='/create' color='#343330'>CRIAR SEU QUIZZ</Button>
            {isError.active && <Notification message={isError.message} setIsError={setIsError} active={isError.active} />}
            {isSubmitComplete && <Redirect to={`/quizz/${quizzId}`} />}
        </div>
    )
}

export default LandingPage