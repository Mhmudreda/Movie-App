
import React, { useState } from 'react';
import avatar from './ava.jpg'
import  axios  from 'axios';
import { useEffect } from 'react';

export default function People()
{



    const [trendingPeople , setTrendingPeople] = useState([])

    async function getMovies()
    {
        let {data}=await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=ae4e31d6fe3afd3121d2972901319eb0`)
        setTrendingPeople(data.results)
    }

    useEffect(()=>{
        getMovies()
       
    },[])


    return(
        
        <div className="row mb-5 d-flex justify-content-center">

        
        <div className="col-md-4 d-flex align-items-center">
            <div>
            <div className="prdr mb-4 w-25"></div>
            <h2 className='h3'>trnding <br/>people<br/> To Watch Right Now</h2>
            <p>Top Trinding people by day</p>
            <div className="prdr mt-4"></div>
            
            </div>

        </div>


        {trendingPeople?
            trendingPeople.map((person , i)=> <div key={i} className='col-md-2 '>
                <div className="person  ">
                    {person.profile_path === null? <img className='w-100' src={avatar}/>:
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path}/>}
                    <h3 className='h6  my-3 '>{person.name}</h3>
                </div>
            </div>):
            <div className=' vh-100 d-flex justify-content-center align-items-center '>
              <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>

        }
        </div>
    )
};