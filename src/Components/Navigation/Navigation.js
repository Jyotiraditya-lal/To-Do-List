import React from "react";
import './Navigation.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthActions } from "../../Store/Auth-Redux";

const Navigation=()=>{

    const isLoggedin=useSelector((state)=>state.Auth.isLoggedin)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logoutHandler=()=>{
        dispatch(AuthActions.logout())
        navigate('/home')
    }

    let content;
    if(isLoggedin){
      content=<Link to='/AddTask'>Things to do</Link>       
    }
    else{
      content=<Link to='/Login'>Login</Link> 
    }

    return(
        <header className='header'>
      <Link to='/Home'>
        <div className='Logo'>To Do List</div>
      </Link>
      <nav>
        <ul>
        <li>
            {content}
        </li>
        <li>
            {isLoggedin && <Link to='/Completed'>Completed Tasks</Link>}
        </li>
        <li>
        {isLoggedin && <Link to='/Profile'>Profile</Link>}
          </li>
          <li>{isLoggedin && <button onClick={logoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
      </header>
    )
}

export default Navigation