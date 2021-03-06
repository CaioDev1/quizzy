import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import LandingPage from './views/LandingPage/LandingPage'
import CreatePage from './views/CreatePage/CreatePage'

function App() {
    return (
        <Router>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/create' component={CreatePage} />
        </Router>
    )
}

export default App