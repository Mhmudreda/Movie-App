
import React, { useState } from 'react';
import  axios  from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function TrendingDetails()
{
   
    
    
    const [Details , setDetails] = useState(null)
    let params = useParams()

    async function getTrendingDetails(id)
    {
      let {data}= await  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=ae4e31d6fe3afd3121d2972901319eb0&language=en`)
      setDetails(data)
    }
    useEffect(()=>{
        getTrendingDetails(params.id)
    }, [])



    return(
        <>
        {Details?
        <div className="row">
            <div className="col-md-3">
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+Details.poster_path} alt="" />
            </div>
            <div className="col-md-9 d-flex justify-content-center align-items-center ">
                <div>
                 <h2>{Details.name}</h2>
                 <p>{Details.tagline}</p>
                  <div className='pack d-flex my-4 '>
                    <h6 className='mx-2 bg-info p-2'>{Details.genres[0].name}</h6>
                    <h6 className='mx-2 bg-info p-2'>{Details.genres[1].name}</h6>
                    <h6 className='mx-2 bg-info p-2'>{Details.spoken_languages[0].name}</h6>
                  </div>
                  <ul>
                  <li className='my-1'> vote_count : {Details.vote_count}</li>
                   <li className='my-1'> vote_average : {Details.vote_average}</li>
                   <li className='my-1'> popularity : {Details.popularity}</li>
                   <li className='my-1'> release_date : {Details.release_date}</li>
                  </ul>
                  <p className='my-3'>{Details.overview}</p>
                </div>
               
            </div>
            </div>:<div className=' vh-100 d-flex justify-content-center align-items-center '>
                <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>
        }


        </>
    )
    
};