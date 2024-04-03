

import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(props)
{
    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {
            props.userToken?<>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="profile">Profile</Link>
        </li>
        
      
            </>:''
        }
        
       
     </ul>

     <ul className="navbar-nav  mb-2 mb-lg-0">
        <li className=' d-flex align-items-center '>
            <i className=' mx-2 fab fa-facebook'></i>
            <i className=' mx-2 fab fa-twitter'></i>
            <i className=' mx-2 fab fa-instagram'></i>
            <i className=' mx-2 fab fa-spotify'></i>
        </li>
     </ul>
     <ul className="navbar-nav  mb-2 mb-lg-0">
        {
            props.userToken?  <li className="nav-item">
            <span onClick={props.logOut} className="nav-link">Logout</span>
          </li>:
          <>
           <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
          </>
        }
       
      
       
     </ul>
    
    </div>
  </div>
</nav>
        </div>
    )
};