import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, Link } from "react-router-dom";


const Home = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const jwt = localStorage.getItem('jwtToken');
    const navigate = useNavigate();


    useEffect(()=>{

        if(jwt === undefined){
            navigate('/login');
        }

    },[isLoggedIn]);

    const logOut = () =>{
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false)
    }


    return(
    <div>
        <h1>Hooo</h1>
       <Link to ='/login'> <button type="button" onClick={logOut} >TEST</button> </Link> 
    </div>
    )
}
export default Home