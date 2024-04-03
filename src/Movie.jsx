import React, { useState } from 'react';
import  axios  from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Movie()
{
    const [movieDetails , setMovieDetails] = useState(null)
    let params = useParams()

    async function getMovieDetails(id)
    {
      let {data}= await  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ae4e31d6fe3afd3121d2972901319eb0&language=en`)
      setMovieDetails(data)
    }
    useEffect(()=>{
        getMovieDetails(params.id)
    }, [])



    return(
        <>
        {movieDetails?
        <div className="row">
            <div className="col-md-3">
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt="" />
            </div>
            <div className="col-md-9 d-flex justify-content-center align-items-center ">
                <div>
                 <h2>{movieDetails.title}</h2>
                 <p>{movieDetails.tagline}</p>
           {      <div className='pack d-flex my-4 '>
                    <h6 className='mx-2 bg-info p-2'>{movieDetails.genres[0].name}</h6>
                    <h6 className='mx-2 bg-info p-2'>{movieDetails.genres[1].name}</h6>
                    <h6 className='mx-2 bg-info p-2'>{movieDetails.spoken_languages[0].name}</h6>
                 </div>
               }   <ul>
                  <li className='my-1'> vote_count : {movieDetails.vote_count}</li>
                   <li className='my-1'> vote_average : {movieDetails.vote_average}</li>
                   <li className='my-1'> popularity : {movieDetails.popularity}</li>
                   <li className='my-1'> release_date : {movieDetails.release_date}</li>
                  </ul>
                  <p className='my-3'>{movieDetails.overview}</p>
                </div>
               
            </div>
            </div>:<div className=' vh-100 d-flex justify-content-center align-items-center '>
                <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>
        }


        </>
    )
};