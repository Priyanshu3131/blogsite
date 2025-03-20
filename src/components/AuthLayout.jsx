import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

//The Protected component is a higher-order component (HOC) that protects routes by checking the user's authentication status. It redirects the user to either the login page or the home page based on their authentication status.

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true) //Controls whether the loading message is displayed
    const authStatus = useSelector(state => state.auth.status) // Fetches the authentication status from Redux (true = logged in, false = not logged in)


    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</> //children → The protected content that should only be visible to authenticated or unauthenticated users
}
