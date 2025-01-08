import React, { useState, useEffect } from 'react';
import './signup.css'; 
import {Link, useNavigate} from 'react-router-dom';



function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
   
  const jwt = localStorage.getItem('jwtToken');
  const navigate = useNavigate();


  
  useEffect(()=>{
      if(jwt !== null){
          navigate('/login');
      }
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {username, password};
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    console.log('Handle submit');
    const response = await fetch('http://localhost:3001/signup', options);
    console.log(response);
    if (response.ok){
      const data = await response.json()
      localStorage.setItem('jwtToken', data.token);
    }else{
      const data = await response.json();
      console.log(data)
      if (data.error === 'Username already exists.'){
        setWarning('User already exists Please Login')
      }
    }
    if (response.status===201){
      setWarning('User Created Please Login')
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={event=>setUsername(event.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {warning && <Link to='/login' > <p className="warning-text">{warning}</p></Link>}
        <button type="submit"   className="signup-button" onClick={handleSubmit} >Login</button>
      </form>
    </div>
  );
}

export default SignupForm;




