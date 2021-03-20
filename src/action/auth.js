import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOG_OUT
} from "../constants/constants";
import axios from 'axios'
import { setToken } from "../setToken";

export const loadUser = () => async (dispatch) => {
  if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
  }
  try {
    const response = await axios.get('https://vast-wave-79907.herokuapp.com/user')
    dispatch({
      type: LOAD_USER,
      payload: response.data
    })
  } catch (error) {
    dispatch({type: AUTH_ERROR,payload:error})
  }
};
export const registerUser =(email,password)=> async dispatch =>{
  console.log("hgfjyhmkujnlikj",email,password)
  try{
    const config ={
      header:{
        'Content-Type':'application/json',
      }
    }
    // const body = JSON.stringify({email , password})
    
   const response = await axios.post('https://vast-wave-79907.herokuapp.com/reg',{
     
     email: email,
     password : password,
   });
   console.log("rahul",response.data)
  dispatch({
    
    type: REGISTER_SUCCESS,
    payload: response.data
    
  }
  
  )
  dispatch(loadUser());
  }
catch (error){
  dispatch({type: REGISTER_FAIL, payload:error})
}
}
export const loginUser =(email,password)=> async dispatch =>{
  try{
    const config ={
      header:{
        'Content-Type':'application/json'
      }
    }
   
   const response = await axios.post('https://vast-wave-79907.herokuapp.com/login',{
     
   email: email,
   password : password,
 });
  dispatch({
    type: LOGIN_SUCCESS,
    payload: response.data
  }
  )
  dispatch(loadUser());
  }
catch (error){
  dispatch({type: LOGIN_FAIL, payload:error})
}
}
export const logOut =()=> async dispatch =>{
  dispatch({type: LOG_OUT });
  }


