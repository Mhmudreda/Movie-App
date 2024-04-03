
import React, { useState } from 'react';
import  axios  from 'axios';
import { useEffect } from 'react';
import avatar from  './OIP.jpeg'
import { Link } from 'react-router-dom';

export default function Home()
{

    const[trindingMovies , setTrendingMovies]= useState([])
    const[trindingTv , setTrendingTv]= useState([])
    const [trendingPeople , setTrendingPeople] = useState([])

    async function getMovies(dataType,callback)
    {
        let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${dataType}/day?api_key=ae4e31d6fe3afd3121d2972901319eb0`)
        callback(data.results.slice(0,10))
    }

    useEffect(()=>{
        getMovies('movie',setTrendingMovies)
        getMovies('tv',setTrendingTv)
        getMovies('person',setTrendingPeople)
    },[])

    async function searchMovie(e)
    {
        let value = e.target.value
        if(value !='')
        {
            let{data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&api_key=ae4e31d6fe3afd3121d2972901319eb0`)
            setTrendingMovies(data.results)
        }
        else
        {
            getMovies('movie',setTrendingMovies)
        }
    }


    return(
        <>
        <input type="text" id='search' onChange={searchMovie} className='form-control bg-transparent text-white my-3 w-75 mx-auto ' placeholder='Search movie......' />

        <div className="row mb-5">
        
        <div className="col-md-4 d-flex align-items-center">
            <div>
            <div className="prdr mb-4 w-25"></div>
            <h2 className='h3'>trnding <br/>Movies<br/> To Watch Right Now</h2>
            <p>Top Trinding movies by day</p>
            <div className="prdr mt-4"></div>
            </div>

        </div>

        {
            trindingMovies.map((movie , i)=> <div key={i} className='col-md-2'>
                <div className="movie ">
                    <Link to={`/movie/${movie.id}`}>
                        {movie.poster_path?
                        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}/>:
                        <img src="avatar" alt="" />
                        }
                    <h3 className='h6 my-3 '>{movie.title}</h3>
                    </Link>

                </div>
            </div>)
        }
        </div>

        <div className="row mb-5">
        
        <div className="col-md-4 d-flex align-items-center">
            <div>
            <div className="prdr mb-4 w-25"></div>
            <h2 className='h3'>trnding <br/>Tv<br/> To Watch Right Now</h2>
            <p>Top Trinding Tv by day</p>
            <div className="prdr mt-4"></div>
            </div>

        </div>

        {
            trindingTv.map((tv , i)=> <div key={i} className='col-md-2'>
                <div className="tv ">
                <Link to={`/trendingdetails/${tv.id}`}>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path}/>
                <h3 className='h6  my-3 '>{tv.name}</h3>
                </Link>

                </div>
            </div>)
        }
        </div>

        <div className="row mb-5">
        
        <div className="col-md-4 d-flex align-items-center">
            <div>
            <div className="prdr mb-4 w-25"></div>
            <h2 className='h3'>trnding <br/>people<br/> To Watch Right Now</h2>
            <p>Top Trinding people by day</p>
            <div className="prdr mt-4"></div>
            </div>

        </div>

        {
            trendingPeople.map((person , i)=> <div key={i} className='col-md-2'>
                <div className="person ">
                    {person.profile_path === null? <img className='w-100' src={avatar}/>:
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path}/>}
                <h3 className='h6  my-3 '>{person.name}</h3>

                </div>
            </div>)
        }
        </div>


       
        
        </>
    )
};

