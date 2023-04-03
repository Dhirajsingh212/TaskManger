import React from 'react'
import './Signup.css'
import {Link} from 'react-router-dom'
import {useState} from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../store';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const {isFetching,error}=useSelector((state)=>state);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [cnfPassword,setCnfPassword]=useState('');
  const [email,setEmail]=useState('');


  const submitHandler=async(e)=>{
    e.preventDefault();  
    try{
        dispatch(actions.loginStart());
        if(cnfPassword!==password){
          alert("Password does not match");
          return;
        }
        const data=await axios.post('https://task-manager-5jql.onrender.com/Signup',{username,email,password});
        dispatch(actions.loginSuccess(data.data.token));
        navigate('/home');
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
    <div className="signup">
      <form className="signupForm" onSubmit={submitHandler}>
      <h1 className="signupTitle">Create Account</h1>
        <input
          type="username"
          placeholder="Enter Your Username"
          className="signupInput"
          value={username}
          required
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="signupInput"
          value={email}
          required
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="signupInput"
          value={password}
          required
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="signupInput"
          value={cnfPassword}
          required
          onChange={(e)=>{setCnfPassword(e.target.value)}}
        />
        <div className='signup_buttons'>
          <button className="signupButton" type="submit">
            SIGN UP
          </button>
          <button className="signupLoginButton">
            <Link to="/Login" className="link">
              SIGN IN
            </Link>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup