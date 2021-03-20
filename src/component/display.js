import axios from "axios";
import React, { useEffect, useState } from "react";
import {logOut} from '../action/auth'
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./display.css";
import {Link} from 'react-router-dom'
let userData=[];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Display = ({logOut,loadUser}) => {
  const classes = useStyles();

  const [display, setDisplay] = useState({
    allData: [],
  });
  const [allData, setAllData] = useState();


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
      userData.push(response.data.email)
       
       console.log('the data has sent to the server',userData)
  
  })
  }
  let getBlogPost = () => {
    axios
    .post("https://vast-wave-79907.herokuapp.com/apis",{email: userData})
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

  // display.allData.map((data, index) => {
  //   rowsData.push({
  //     id: index,
  //     title: data.title,
  //     body: data.body,
  //   });
  // });

  const tableHeader = ["ID", "Email", "Amount","Status","Title","Note"];

  const TableHeaderData = () => {
    return tableHeader.map((data, index) => <th>{data}</th>);
  };

  

  
  const [history, setHistory] = useState("");

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Transaction History</h1>
        <button onClick={() => logOut()}>
                   <Link to='/'>logOut</Link>
                 </button>
      </div>

      <Grid container justify="center">
        <Grid item xs={12}>
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
    </div>
  );
};
const mapStateToProps = state =>({
  islogedIn: state.islogedIn
 
}, console.log("raaaaaaaaaaaaaa",state))
export default connect(mapStateToProps,{ logOut })(Display);
