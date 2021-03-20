import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {logOut} from '../action/auth'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {
  
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from "@material-ui/icons/Add";


let totalbalance =[];
let Totals=[];
let historyData =[];
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      flexDirection: "column",
      marginRight: "100px",
      
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    maxHeight: "300",
    maxwidth: "600px",
    width: "320px",
    height: "300px",
  },
  background: {
    height: "100%",
    width: "100%",
    
  },
}));

const Customer_login  = ({logOut,loadUser}) => {
  
   
  const [term, setTerm] = useState("React");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  const classes = useStyles();
  let defaultState = {
    title: "",
    date: "",
    amount: "",
    note: "",
  };
  let defaultStates = {
    title: "rahul",
    date: "2020-10-09",
    amount: "0",
    note: "this is desktop view",
  };
  const [Expenses, setExpense] = useState(defaultState);
  const [Expenses2, setExpense2] = useState(defaultState);
  const [newExpenses, setNewExpenses] = useState([defaultStates]);
  const [subExpenses, setSubExpenses] = useState([defaultStates]);
  const [totalAMounts, setTotalAMounts] = useState();
  const [total, setTotal] = useState();
  const [Amounts, setAmounts] = useState();
  const [allData, setAllData] = useState({
    email:"",
    id: "",
  });
  const handleTitleChange = (event) => {
    let temp = { ...Expenses };
    temp.title = event.target.value;
    setExpense(temp);
  };
  const handleAmountChange = (event) => {
    let temp = { ...Expenses };
    temp.amount = event.target.value;
    setExpense(temp);
  };
  
  const handleNoteChange = (event) => {
    let temp = { ...Expenses };
    temp.note = event.target.value;
    setExpense(temp);
  };
  const handleDateChange = (event) => {
    let temp = { ...Expenses };
    temp.date = event.target.value;
    setExpense(temp);
  };

  const handleTitle2Change = (event) => {
    let temp = { ...Expenses2 };
    temp.title = event.target.value;
    setExpense2(temp);
  };
  const handleAmount2Change = (event) => {
    let temp = { ...Expenses2 };
    temp.amount = event.target.value;
    setExpense2(temp);
  };
  
  const handleNote2Change = (event) => {
    let temp = { ...Expenses2 };
    temp.note = event.target.value;
    setExpense2(temp);
  };
  const handleDate2Change = (event) => {
    let temp = { ...Expenses2 };
    temp.date = event.target.value;
    setExpense2(temp);
  };
  const listOfItem = () => {
    setNewExpenses((prevValue) => {
      return [...prevValue, Expenses];
    });
    let payload ={
        id : allData.id,
       email : allData.email,
       title: Expenses.title,
       amount :Expenses.amount,
       note :Expenses.note,
       totalbal :parseInt(Totals)+parseInt(Expenses.amount)||0,
       date :Expenses.date,
       status: "credit",
      }
    axios.post( "https://vast-wave-79907.herokuapp.com/single",payload)
    .then((res)=>{
              console.log(res.statusText)
              console.log("asdgv",historyData)
              
            //  setState(defaultState)
            //  setMyFile('')
             
             console.log('the data has sent to the server')
    
    })
    .catch((err)=>{
      console.log(err)
    })
    setExpense(defaultState);
    
  };
  const listOfSub = () => {
    setSubExpenses((prevValue) => {
      return [...prevValue, Expenses2];
    });
    let payload ={
      id : allData.id,
     email : allData.email,
     title: Expenses2.title,
     amount :parseFloat(-Expenses2.amount),
     note :Expenses2.note,
     totalbal :-(parseFloat(Totals) - parseFloat(Expenses2.amount)||0),
     date :Expenses2.date,
     status: "debit",
    }
  axios.post( "https://vast-wave-79907.herokuapp.com/single",payload)
  .then((res)=>{
            console.log(res.statusText)
           
            
          //  setState(defaultState)
          //  setMyFile('')
           
           console.log('the data has sent to the server')
  
  })
  .catch((err)=>{
    console.log(err)
  })
  setExpense2(defaultState);
  };
  useEffect(() => {
    let totalAmount = [...newExpenses];
    var sum = totalAmount.reduce(function (prev, cur) {
      return parseInt(prev) + parseInt(cur);
    }, 0);
    setTotalAMounts(sum);
    console.log(totalAMounts)
  }, [newExpenses]);
 
  useEffect(() => {
    let totalAmount = [...subExpenses];
    var sub = totalAmount.reduce(function (prev, cur) {
      return  parseInt(cur.amount) - parseInt(prev) ;
    }, 0);
    setTotalAMounts(sub);
    rrr()
  }, [subExpenses]);

 
// console.log(newExpenses)
let rrr =()=>{
  axios.get('https://vast-wave-79907.herokuapp.com/user')
    .then((response)=>{
     
      setAllData({
        email : response.data.email,
        id :response.data._id
      })
      
    //  setState(defaultState)
    //  setMyFile('')
     
     console.log('the data has sent to the server')

})
}
useEffect(() => {
  getBlogPost();
    //  let bal =  Amounts.map(({ amount }) => amount)
      // var sub = bal.reduce(function (prev, cur) {
      //   return  parseInt(prev) + parseInt(cur.amount);
      // }, 0);
      // setAmounts({ balance: sub });
      // console.log("balance", bal)
}, [ Amounts,Totals]);

let getBlogPost = () => {
  let payload ={
   
   email : allData.email,
  
  }
  // axios.get('http://localhost:9000/apis', {data: {"email":"rahul@gmail.com"}})
  // .then(function (response) {
  //   console.log("yyyyyyyyyyyyyyyyyy",response);
  // })
  axios
    .post("https://vast-wave-79907.herokuapp.com/apis",{email: allData.email})
    .then((response) => {
      const data = response.data;
      const ttt = { amount: data.map(({ amount }) => amount) }
      setAmounts(ttt);
      // totalbalance.push(ttt.amount)
      let yy = Amounts.amount
function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}
var summed = sum( yy );

Totals.push(+summed)



    })
    .catch(() => {});
};


  return (
    <div>
      <div className="ui form">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          
          <Grid item xs={6}>
            <div className="field">
              <h2>Customer login </h2>
              <button onClick={() => logOut()}>
                   <Link to='/'>logOut</Link>
                 </button>
                 
                 <button style={{marginLeft:"20px"}} >
                   <Link to='/History'>Transaction History</Link>
                 </button>
           
            </div>
            <div>Available balance :{Totals.slice(-1)}</div>
          </Grid>
          <Grid item xs={2}>
              
              </Grid>  
        </Grid>
      </div>
      <div className="ui celled list"></div>
      <div className={classes.background}>
      <Grid container justify="center" className={classes.root}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid>
            <TextField
              id="standard-basic"
              value={Expenses.title}
              onChange={handleTitleChange}
              label="Title"
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              id="filled-basic"
              label="Amount"
              value={Expenses.amount}
              onChange={handleAmountChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid>
            <TextField
              id="outlined-basic"
              label="Note"
              value={Expenses.note}
              onChange={handleNoteChange}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              variant="outlined"
              label="Date"
              type="date"
              defaultValue="2020-10-09"
              style={{ backgroundColor: "white" }}
              onChange={handleDateChange}
              className={classes.textField}
              style={{ width: "217px" }}
            />
          </Grid>
          <Button
            variant="contained"
            style={{ backgroundColor: "green" }}
            className={classes.button}
            startIcon={<AddIcon />}
            color="primary"
            onClick={listOfItem}
          >
            Deposit
          </Button>
        </form>
        <br />
        <form className={classes.root} noValidate autoComplete="off">
          <Grid>
            <TextField
              id="standard-basic"
              value={Expenses2.title}
              onChange={handleTitle2Change}
              label="Title"
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              id="filled-basic"
              label="Amount"
              value={Expenses2.amount}
              onChange={handleAmount2Change}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid>
            <TextField
              id="outlined-basic"
              label="Note"
              value={Expenses2.note}
              onChange={handleNote2Change}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              variant="outlined"
              label="Date"
              type="date"
              defaultValue="2020-10-09"
              style={{ backgroundColor: "white" }}
              onChange={handleDate2Change}
              className={classes.textField}
              style={{ width: "217px" }}
            />
          </Grid>
          <Button
            variant="contained"
            style={{ backgroundColor: "green" }}
            className={classes.button}
            startIcon={<RemoveIcon />}
            color="primary"
            onClick={listOfSub}
          >
            Withdraw
          </Button>
        </form>
        <ol>
          {/* <Grid>
            <Paper className={classes.paper} style={{ overflow: "auto" }}>
              {newExpenses.map((val, index) => {
                return <DisplayCard key={index} data={val} />;
              })}
            </Paper>
          </Grid> */}
          
        </ol>
      </Grid>
    </div>
    </div>

  );
};


const mapStateToProps = state =>({
  islogedIn: state.islogedIn
 
}, console.log("raaaaaaaaaaaaaa",state))

export default connect(mapStateToProps,{ logOut })(Customer_login );