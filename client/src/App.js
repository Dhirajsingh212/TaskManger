import React from 'react'
import Signup from './pages/Signup/Signup'
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import EditTask from './pages/EditTask/EditTask';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/:id" element={<EditTask/>}/>
      </Routes>
    </Router>
  )
}

export default App