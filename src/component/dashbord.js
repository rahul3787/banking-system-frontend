import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Search from "./cust";
import {registerUser} from '../action/auth'
import {logOut} from '../action/auth'
import Box from "@material-ui/core/Box";
const Register =({islogedIn ,logOut})=>{
    
return(
    <div>
      <center>
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} style={{width:"400px", height:"300px"}}>
        <h1>
            Banking system
           
        </h1>
        {/* style={{width:"500px"}} */}
        {/* <Box boxShadow={3} bgcolor="background.paper" m={1} p={1} > */}
        {
            islogedIn ? (
                <div>
                <h1>you have successfully registered</h1>
                  {/* <Search /> */}
                 <br />

                 <button onClick={() => logOut()}>
                     Go to home
                 </button>
                </div>
            )
            :
            (
                <div>
                <h2>You need to  login first</h2>
                </div>
            )
        }
        <div >
            <br />
        <span style={{display: 'flex'}}>
            <button style={{display: islogedIn ? "none": "block",marginLeft:"130px"}}>
        <Link to="/login" style={{display: islogedIn ? "none": "block"}}>Login</Link>
        </button>
        <br />
        <button  style={{display: islogedIn ? "none": "block",marginLeft:"40px"}}>
        <Link to="/register" style={{display: islogedIn ? "none": "block"}}>register</Link>
        </button>
        </span>
        </div>
         </Box>
       </center>
    </div>
)
}
const mapStateToProps = state =>({
    islogedIn: state.islogedIn
})
export default connect(mapStateToProps, { logOut })(Register);
