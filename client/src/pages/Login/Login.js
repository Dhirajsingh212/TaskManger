import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import { actions } from '../../store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const {isFetching,error}=useSelector((state)=>state)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [cnfPassword,setCnfPassword]=useState('');

  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
      dispatch(actions.loginStart());
      if(cnfPassword!==password){
        alert("Password does not match");
        return;
      }
      const data=await axios.post('https://task-manager-5jql.onrender.com/Login',{username,password});
      dispatch(actions.loginSuccess(data.data.token));
      navigate('/home')
    }catch(err){
      console.log(err);
      dispatch(actions.loginFail());
    }
  }

  if(isFetching){
    return(
      <div className='loading'></div>
    )
  }

  if(error){
    return(
      <div>error please reload the page</div>
    )
  }

  return (
    <div className="login">
      <form className="loginForm" onSubmit={submitHandler}>
      <h1 className="loginTitle">Login</h1>
        <input
          type="text"
          placeholder="Enter Your Usrname"
          className="loginInput"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="loginInput"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="loginInput"
          value={cnfPassword}
          onChange={(e)=>{setCnfPassword(e.target.value)}}
          required
        />
        <div className='login_buttons'>
          <button className="loginButton" type="submit">
            SIGN IN
          </button>
          <button className="loginRegisterButton">
            <Link to="/" className="link">
              SIGN UP
            </Link>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login