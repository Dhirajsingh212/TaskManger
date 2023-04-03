import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card'
import './Home.css'
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { actions } from '../../store';

const Home = () => {
    const {token,isFetching,error} = useSelector((state) => state);
    const dispatch=useDispatch();

    const [data, setData] = useState([]);
    
    useEffect(() => {
        dispatch(actions.loadingStart());
        axios.get('https://task-manager-5jql.onrender.com/Gettask', {headers: {
                token
            }}).then((res) => {
              setData(res.data.data)
              dispatch(actions.loadingSuccess());
        }).catch((err) => {
            console.log(err);
            dispatch(actions.loadingFail());
        })
    },[])

    if (token === 'null') {
        return (
            <div>
                <p>please login first</p>
                <Link to='/Login'>Login</Link>
            </div>
        )
    }

    if(isFetching){
      return(
        <div className='loading'></div>
      )
    }

    if(error){
      return(
        <div>error please login</div>
      )
    }

    return (
        <div className='home'>
            <Navbar/>
            <div className='home_card'>
                {data.length===0?<p>no task found</p>:
                data.map((e) => (
                    <Card key={e._id} e={e}/>))
            } </div>
        </div>
    )
}

export default Home
