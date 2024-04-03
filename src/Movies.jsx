import React, { useState } from 'react';
import  axios  from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from  './OIP.jpeg'

export default function Movies()
{
    let nums = new Array(13).fill(1).map((elem , i)=> i+1)
    const[trindingMovies , setTrendingMovies]= useState([])

    async function getMovies(pageNum)
    {
        let {data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=ae4e31d6fe3afd3121d2972901319eb0&include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`)
        setTrendingMovies(data.results)
    }

    useEffect(()=>{
        getMovies(1)
    
    },[])

    async function searchMovie(e)
    {
        let value = e.target.value
        if(value != '')
        {
            let{data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&api_key=ae4e31d6fe3afd3121d2972901319eb0`)
            setTrendingMovies(data.results)
        }
        else
        {
            getMovies(1)
        }
        
    }

    return(
        <>


        <input type="text" onChange={searchMovie} className='form-control bg-transparent text-white my-4 w-75 mx-auto ' placeholder='Search movie......' />

        {trindingMovies?
         <div className="row mb-5 d-flex justify-content-center">

         {
             trindingMovies.map((movie , i)=> <div key={i} className='col-md-2'>
                 <div className="movie ">
                     <Link to={`/movie/${movie.id}`}>
                        {movie.poster_path?
                        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}/>:
                        <img src={avatar} alt="" />
                        }
                     <h3 className='h6 my-3 '>{movie.title}</h3>
                     </Link>
 
                 </div>
             </div>)
         }
         </div>:
         <div className=' vh-100 d-flex justify-content-center align-items-center '>
         <i className='fas fa-spinner fa-spin fa-3x'></i>
     </div>
        }

<nav aria-label="..." className="pb-5 mb-5">
  <ul className="pagination pagination-sm d-flex justify-content-center">

    {
        nums.map((x , i)=> <li onClick={()=> getMovies(x)} key={i} className="page-item"><a className="page-link bg-transparent text-white" >{x}</a></li>)

    }
 
  </ul>
</nav>

        
        </>
    )
};