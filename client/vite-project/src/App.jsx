import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/Login/Login'
import Home from './Components/Home/Home';
import SignupForm from './Components/Signup/signup';

function App() {
  const [count, setCount] = useState(0)

  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken !== undefined){
    <Navigate to = "/" replace/>
  }else{
    <Navigate to = '/login' replace/>
  }

  return (
    
      <BrowserRouter>
      <Routes>
        <Route exact path = '/signup' element = {<SignupForm/>}/>
        <Route exact path='/login' element = {<LoginForm/>}/>
        <Route exact path = '/' element={<Home/>}/>
        
      </Routes>
      </BrowserRouter>
    
  )
}

//added for push

export default App
