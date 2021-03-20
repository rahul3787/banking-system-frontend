import React, { useState } from 'react';
import {loginUser} from '../action/auth'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
// import  from './wiki';
const Login =({loginUser,islogedIn})=>{
    const history = useHistory();
    const [data , setData ]=useState({
        email:"",
        password: ""
    })
    const handleEmail =(event)=>{
        let temp ={...data}
        temp.email = event.target.value;
        setData(temp);
    }
    const handlePassword =(event)=>{
        let temp ={...data}
        temp.password = event.target.value;
        setData(temp);
    }
    const handelSubmit =(event)=>{
        let email =event.target.email.value;
        let password =event.target.password.value;
      
        if( email === ''&&  password ==='')return alert("empty value");
        else if( email === 'Admin@gmail.com'&&  password ==='12345')return history.push("/admin");
        
        else loginUser(email,  password);
        console.log("login",email,password)
        event.preventDefault();
        console.log(data);
       
    
       
      }
      if(islogedIn) return <Redirect to='/dashboard'/>
return(
    <div>
        <center>
         <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} style={{width:"400px", height:"300px"}}>
             <h1>LOGIN</h1>
        <form onSubmit={handelSubmit} >
        <label>Email:</label>
        <br />
        <input type="email" onChange={handleEmail} name="email" value={data.email}/>
        <p style={{fontSize:"12px"}}>Exp: rahul@gmail.com</p>
        
        <label>Password:</label>
        <br />
        <input type="password" onChange={handlePassword} name="password" value={data.password}/>
        <br />
        <br />
        <input type="submit"/>
         
        </form>
        </Box>
        </center>
    </div>
)
} 
const mapStateToProps = state =>({
    islogedIn: state.islogedIn
})
export default connect(mapStateToProps, {loginUser})(Login);