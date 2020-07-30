import { Route, BrowserRouter, Switch } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import CreatePoints from './pages/CreatePoints'

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/create-points' component={CreatePoints}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
