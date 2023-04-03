import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../store';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './EditTask.css'

const EditTask = () => {
    const params=useParams().id;
    const navigate=useNavigate();
    const {token,isFetching,error}=useSelector((state)=>state);
    const dispatch=useDispatch();
    const [data,setData]=useState('');
    const [task,setTask]=useState('');

    useEffect(()=>{
        dispatch(actions.loadingStart());
        axios.get(`https://task-manager-5jql.onrender.com/Getonetask/${params}`,{headers:{token}})
        .then((res)=>{
            setData(res.data.data);
            setTask(res.data.data.task);
            dispatch(actions.loadingSuccess());
        })
        .catch((err)=>{
            console.log(err);
            dispatch(actions.loadingFail());
        })
    },[]);

    const updateHandler=async()=>{
        try{
            dispatch(actions.loadingStart());
            await axios.put(`https://task-manager-5jql.onrender.com/Updatetask/${params}`,{task:task},{headers:{token}});
            dispatch(actions.loadingSuccess());
            navigate('/home')
        }catch(err){
            console.log(err);
            dispatch(actions.loadingFail());
        }
    }
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date(data.time);
    let day = weekday[d.getDay()];
    let hours=d.getHours();
    let minutes=d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =day+' '+ hours + ':' + minutes + ' ' + ampm;

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
    <>
    <Navbar/>
    <div className='edittask_main'>
        <div className='edittask'>
            <input value={task} onChange={(e)=>{setTask(e.target.value)}}/>
            <p>{strTime}</p>
            <button onClick={updateHandler}>Update</button>
        </div>
    </div>
    </>
  )
}

export default EditTask