import React, { useEffect, useState } from 'react';
import axios from "axios";
import {logOut} from '../action/auth'
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom'
const Admin=({logOut,loadUser})=>{
    const [allData, setAllData] = useState();
    const [display, setDisplay] = useState({
        allData: [],
      });

    useEffect(() => {
      
      rrr();
      
    }, []);
    
    let rrr =()=>{
      axios.get('https://vast-wave-79907.herokuapp.com/user')
        .then((response)=>{
         
          setAllData({
            email : response.data.email,
            id :response.data._id
          })
          
        //  setState(defaultState)
        //  setMyFile('')
        // userData.push(response.data.email)
         
        //  console.log('the data has sent to the server',userData)
    
    })
    }
    let getBlogPost = () => {
        axios
        .post("https://vast-wave-79907.herokuapp.com/all",)
          .then((response) => {
            const data = response.data;
    
            setDisplay({ allData: data });
            console.log(display)
          })
          .catch(() => {});
      };
      useEffect(() => {
        
        getBlogPost();
        
      }, [ display]);
      const tableHeader = ["ID", "Email", "Amount","Status","Title","Note"];

  const TableHeaderData = () => {
    return tableHeader.map((data, index) => <th>{data}</th>);
  };

    return(
       
        <Grid container justify="center">
             <h1>Admin Banker</h1>
             
        <Grid item xs={12}>
        <button onClick={() => logOut()}>
                   <Link to='/'>logOut</Link>
                 </button>
          <center>
            <div>
              <table id="tableFileData">
                <tr>{TableHeaderData()}</tr>

                <tbody>
                  {display.allData.map((data, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{data.email}</td>
                      <td>{data.amount}</td>
                      <td>{data.status}</td>
                      <td>{data.title}</td>
                      <td>{data.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </Grid>
      </Grid>
    )
    
   
}
const mapStateToProps = state =>({
  islogedIn: state.islogedIn
 
}, console.log("raaaaaaaaaaaaaa",state))
export default connect(mapStateToProps,{ logOut })( Admin);
