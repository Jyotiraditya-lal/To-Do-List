import { useState, useRef } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/Auth-Redux';

const Login = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [enteredName, setEnteredName]=useState('')
  const EmailRef=useRef()
  const PasswordRef=useRef()
  const ConfPasswordRef=useRef()

  const switchLoginHandler=()=>{
    setIsLogin((prevState) => !prevState);
  }

  const NameChangeHandler=(event)=>{
    setEnteredName(event.target.value)
  }

  const fetchName=async (localId,idToken,Email)=>{
    if(isLogin){
      const response=await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/name/${localId}.json`)
      const data=await response.json()
      let entName
      for(const key in data){
        console.log(data[key].name)
        entName=data[key].name
      }
      dispatch(AuthActions.login({Name: entName,idToken: idToken, UID: localId, email: Email}))
    
      
    }else{
      const response=await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/name/${localId}.json`,{
        method: 'POST',
        body: JSON.stringify({name: enteredName})
      })
      if(response.ok){
        console.log(enteredName)
      }
    }
  }

  const SubmitHandler= (event)=>{

    event.preventDefault()

    let errorMessage='Authentication Failed!'
    
    const enteredEmail=EmailRef.current.value;
    const enteredPass= PasswordRef.current.value;
    let enteredConf
    let url;

    
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8i78_O5qsfV3V7uORT73BLH5Fni3jYFA'
      
     }else{
       url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8i78_O5qsfV3V7uORT73BLH5Fni3jYFA'
       enteredConf=ConfPasswordRef.current.value
       
     }
      
     if(isLogin || enteredConf===enteredPass){
      
      fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(async (response)=>{
        if(response.ok){
          return response.json()
        }else{
           const data = await response.json();
           if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          }
        }})
      .then((data)=>{
       
        
        if(isLogin){
          fetchName(data.localId,data.idToken,enteredEmail) 
          navigate('/home');
        }else{
          fetchName(data.localId)
          alert('Your account has been created!')
          setIsLogin(false)
          navigate('/login')
        }
      }).catch((err)=>{alert(err.message)})
      
      
    
    
   }  
    
  }

  const ForgotPasswordHandler=()=>{
    navigate('/NewPassword')
  }

  
  return (
    
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={SubmitHandler}>
      {!isLogin && <div className='control'>
          <label htmlFor='Name'>Enter your name</label>
          <input
            type='text'
            id='Name'
            required
            value={enteredName}
            onChange={NameChangeHandler}
          />
        </div>}
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={EmailRef} />
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={PasswordRef}
          />
        </div>
        {!isLogin && <div className='control'>
          <label htmlFor='password'>Confirm Your Password</label>
          <input
            type='password'
            id='Confpassword'
            required
            ref={ConfPasswordRef}
          />
        </div>}
        <div className='actions'>
          <button type='submit'>{isLogin ? 'Login' : 'Create account'}</button>
          <button
            type='button'
            className='toggle'
            onClick={ForgotPasswordHandler}
          >
            Forgot Password
          </button>
          <button
            type='button'
            className='toggle'
            onClick={switchLoginHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
