import React, {useState} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import LandingPage from './views/LandingPage/LandingPage'
import CreatePage from './views/CreatePage/CreatePage'
import QuizzPage from './views/QuizzPage/QuizzPage'
import ResultsPage from './views/ResultsPage/ResultsPage'

import CurrentPlayerIdContext from './Contexts'

function App() {
    let [currentPlayerId, setCurrentPlayerId] = useState('')

    return (
        <Router basename='/'>
            <CurrentPlayerIdContext.Provider value={[currentPlayerId, setCurrentPlayerId]}>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/create' component={CreatePage} />
                <Route exact path='/quizz/:quizzId' component={QuizzPage} />
                <Route exact path='/quizz/:quizzId/results' component={ResultsPage} />
            </CurrentPlayerIdContext.Provider>
        </Router>
    )
}

export default App