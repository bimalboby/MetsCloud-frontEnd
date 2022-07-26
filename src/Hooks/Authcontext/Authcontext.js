import Axios from 'Config/Axios/Axios'
import React, { createContext, useEffect, useState } from 'react'

export const usercontext = createContext()

const Authcontext = (props) => {
    const [userdetails, setuserdetails] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const userdesignnation = {
        bo:"Business Owner",
        pm:"Project Manager",
        sv:"Supervisor"
    }

    useEffect(() => {
        const getdata = async() => {
            let res = await Axios.post("/iiot-dashboard")
            res.data["design"] = userdesignnation[res.data.designation]
            setuserdetails(res.data)
        } 
        
      if(isLoggedIn){
        getdata()
      }
    }, [isLoggedIn])
    
  return (
    <usercontext.Provider value={{userdetails,setuserdetails,isLoggedIn, setIsLoggedIn}}>
        {props.children}
    </usercontext.Provider>
  )
}

export default Authcontext