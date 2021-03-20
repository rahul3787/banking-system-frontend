import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import store from '../store'
import Register from './register'
import Login from './login'
import Dashbord from './dashbord'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {loadUser} from "../action/auth"
import {setToken} from "../setToken"
import Customer_login from "./cust";
import Display from './display'
import Admin from './admin'
if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
}
const Form =()=>{
 useEffect(()=>{
     store.dispatch(loadUser());
 },[])
return(
    <Provider store={store}>
        <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Dashbord} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Customer_login} />
            <Route exact path="/History" component={Display} />
            <Route exact path="/admin" component={Admin} />
        </Switch>
    
    </Provider>
)
}
export default Form;