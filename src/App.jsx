import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import LandingPage from './views/LandingPage/LandingPage'
import CreatePage from './views/CreatePage/CreatePage'
import QuizzPage from './views/QuizzPage/QuizzPage'
import ResultsPage from './views/ResultsPage/ResultsPage'

function App() {
    return (
        <Router>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/create' component={CreatePage} />
            <Route exact path='/quizz' component={QuizzPage} />
            <Route exact path='/results' component={ResultsPage} />
        </Router>
    )
}

export default App