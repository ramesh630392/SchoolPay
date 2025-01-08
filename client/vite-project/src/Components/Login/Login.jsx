import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import './Login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const jwtToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate()
  
  useEffect(()=>{

    if (jwtToken !== null){
      console.log(jwtToken);
      navigate('/');
    }
  },[isLoggedIn]);

  const getData = async()=>{
      const body = {username,password}
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      console.log('Handle submit');
      const response = await fetch('http://localhost:3001/login', options);
      console.log(response);
      if (response.ok){
        const data = await response.json()
        localStorage.setItem('jwtToken', data.token);
        setIsLoggedIn(true)
        
      }else{
        const data = await response.json()
        console.log(data)
      }
  };

  const onChangeUsername = event =>{
    setUsername(event.target.value);
  };

  const onChangePassword = event =>{
    setPassword(event.target.value);
  };


  const handleSubmit =  (e) => {

    e.preventDefault();
    getData();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={onChangeUsername} name="username" placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={onChangePassword} name="password" placeholder="Enter your password" required />
        </div>
        <button type="submit"   className="login-button" onClick={handleSubmit} >Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
