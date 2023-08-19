import React from 'react';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import Layout from './Components/Navigation/Layout';
import Home from './Components/Home/Home';
import AddTasks from './Components/AddTasks/AddTasks';
import Completedtasks from './Components/CompletedTasks/CompletedTasks';
import NewPassword from './Components/Login/NewPassword'
import Profile from './Components/Profile/profile';
import './App.css'


function App() {
  
  const isLoggedin=useSelector((state)=>state.Auth.isLoggedin)
  return (
    <Layout>
      <Routes>
        <Route path='/home' element={<Home />} />
        {!isLoggedin && <Route path='/Login' element={<Login />} />}
        {isLoggedin && <Route path='/AddTask' element={<AddTasks />} />}
        {!isLoggedin && <Route path='/NewPassword' element={<NewPassword />} /> }
        {isLoggedin && <Route path='/Completed' element={<Completedtasks />} />}
        {isLoggedin && <Route path='/Profile' element={<Profile />} />}
        <Route path='*' element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
