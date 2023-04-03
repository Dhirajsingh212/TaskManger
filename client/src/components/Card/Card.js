import React from 'react'
import './Card.css'
import axios from 'axios';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { actions } from '../../store';
import {useNavigate} from 'react-router-dom'

const Card = ({e}) => {

  const {token}=useSelector((state)=>state);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const d = new Date(e.time);
  let day = weekday[d.getDay()];
  let hours=d.getHours();
  let minutes=d.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime =day+' '+ hours + ':' + minutes + ' ' + ampm;

  const deleteHandler=async()=>{
    try{
      dispatch(actions.loadingStart());
      await axios.delete(`https://task-manager-5jql.onrender.com/Deletetask/${e._id}`,{headers:{token}});
      dispatch(actions.loadingSuccess());
      window.location.reload(true);
    }
    catch(err){
      alert(err);
      dispatch(actions.loginFail());
    }
  }

  return (
    <div className='card'>
        <div className='card_title'>
          <h3 className='card_heading'>{e.task.slice(0,25)}</h3>
        </div>
        <div className='card_date'>
            <p>{strTime}
            </p>
        </div>
        <div className='card_button'>
            <button onClick={()=>{navigate(`/${e._id}`)}}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    </div>
  )
}

export default Card