
import React, { useState } from 'react';
import  Axios  from 'axios';
import  Joi  from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props)
{
    let navigate = useNavigate()
    const [isLoading , SetIsLoading] = useState(false)
    const [validatePack , setValdidatePack ] = useState([])
    const [error , setError] = useState('')
    const [ user , setUser] = useState({
  
        email:"",
        password:""
    })

    function getUserData(e)
    {
        let myUser = {...user}
        myUser[e.target.name] = e.target.value
        setUser(myUser)
    }

    async function submitLogin(e)
    {
        e.preventDefault()
        SetIsLoading(true)

        let validateResults = validateForm()
        if(validateResults.error)
        {
        setValdidatePack(validateResults.error.details);
        SetIsLoading(false)
        }
        else
        {
        let {data} = await Axios.post('https://movies-api.routemisr.com/signin',user)
        if(data.message === 'success')
        { 
            SetIsLoading(false)
            localStorage.setItem('userData', data.token)
            props.saveUserData()
            navigate('/home')
          
        }
        else
        {
          setError(data.message)
          SetIsLoading(false)

        }
        }
    }

    function validateForm()
    {
        let schema = Joi.object({
           
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })
                                // to move to all the input to check validate
        return schema.validate(user, {abortEarly:false});
    }



    return(
        <>


        <div className="container w-75 m-auto">
            <h2 className='my-3'>Login Now</h2>
            {
                validatePack.map((error)=> <div className='alert alert-danger'>{error.message}</div>)
            }

            {error.length>0? <div className='alert alert-danger'>{error}</div>:'' }
            <form onSubmit={submitLogin} >
             

                <label htmlFor="email">email</label>
                <input onChange={getUserData}  type='email' className='form-control mb-3' id='email' name='email' />

                <label htmlFor="password">password</label>
                <input onChange={getUserData}  type='password' className='form-control mb-3' id='password' name='password' />
                <button type='submit' className='btn btn-outline-info' >
                    {
                        isLoading? <i className='fas fa-spinner fa-spin'></i>:'Login'
                    }
                </button>

                
            </form>
        </div>
        
        
        </>
    )
};