import './App.css';
import Footer from './Footer';
import Home from './Home';
import Movie from './Movie';
import TrendingDetails from './TrendingDetails';
import Movies from './Movies';
import Navbar from './Navbar';
import { Routes, useNavigate , Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Notfound from './Notfound';
import People from './People';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { useEffect } from 'react';


export default function App()
{
  let navigate = useNavigate()

  const [userToken , setUserToken] = useState({})

  function saveData()
  {
    let encodede = localStorage.getItem('userData')
    let decodede = jwtDecode(encodede)
    setUserToken(decodede)
  }

  function ProtectedRoute(props)
  {
    if(localStorage.getItem('userData') === null)
    {
      return <Navigate to='/login' />
    }
    else
    {
      return props.children;

    }
  }

  useEffect(() =>{
    if(localStorage.getItem('userData'))
    {
      saveData()
    }
  },[])

  function logOut()
  {
    setUserToken(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }



  return(
    <div>

      <Navbar  logOut={logOut} userToken={userToken}/>

      <div className='container'>

        <Routes>
          <Route path='/' element= { <ProtectedRoute><Home/></ProtectedRoute>  }/>


          <Route path='home' element={ <ProtectedRoute><Home/></ProtectedRoute>  }/>
          <Route path='people' element={ <ProtectedRoute><People/></ProtectedRoute>   }/>
          <Route path='profile' element= {<ProtectedRoute><Profile userToken={userToken}/></ProtectedRoute>  }/>
          <Route path='trendingdetails' element={ <ProtectedRoute><TrendingDetails/></ProtectedRoute>  }>
               <Route path=':id' element={ <ProtectedRoute><TrendingDetails/></ProtectedRoute>  }/>
          </Route>
          <Route path='movies' element={ <ProtectedRoute><Movies/></ProtectedRoute>  }/>
          <Route path='movie' element={ <ProtectedRoute><Movie/></ProtectedRoute>  }>
              <Route path=':id' element={ <ProtectedRoute><Movie/></ProtectedRoute>  }/>
          </Route>
          <Route path='login' element={<Login saveUserData={saveData}/>}/>
          <Route path='register' element={<Register/>}/>

          <Route path='*' element={<Notfound/>}/>
          
          


          
        </Routes>

      </div>

      <Footer></Footer>





    </div>
  )

};
