import Axios from "Config/Axios/Axios";
import React, { createContext, useEffect, useState } from "react";

export const usercontext = createContext();

const Authcontext = (props) => {
  const [userdetails, setuserdetails] = useState({});
  const [userid, setUserid] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inhomeGraphs, setInhomeGraphs] = useState([])

  const userdesignnation = {
    bo: "Business Owner",
    pm: "Project Manager",
    sv: "Supervisor",
  };

  const userBackendDesignnation = {
    bo: "businessOwner",
    pm: "projectManager",
    sv: "supervisor",
  };

  console.log(inhomeGraphs);

  const LogOut = () => {
    localStorage.removeItem("designation")
    localStorage.removeItem("id")
    setIsLoggedIn(false)
    setuserdetails({})
    setUserid("")
    setDesignation("")    
  }

  const getuserdetails = async (uid,des) => {
    let res = await Axios.post(
      `/iiot-userconfig?userid=${uid}&designation=${des}`
    );
    res.data["designation"] = userdesignnation[res.data.designation];
    setuserdetails(res.data);
    console.log(res.data);
  };

  const getusergraphs = async (uid,des) => {
    let res = await Axios.post(
      `/iiot-home-graphs?userid=${uid}&designation=${des}`
    );
    setInhomeGraphs(res.data.ids);
    console.log(res.data);
  };

  useEffect(() => {
    setUserid(localStorage.getItem("id"));
    setDesignation(localStorage.getItem("designation"));
    getuserdetails(localStorage.getItem("id"),localStorage.getItem("designation"));
    getusergraphs(localStorage.getItem("id"),localStorage.getItem("designation"));
    if(localStorage.getItem("id")&&localStorage.getItem("designation")){
      setIsLoggedIn(true)
    }
  }, []);

  return (
    <usercontext.Provider
      value={{
        userdetails,
        inhomeGraphs,
        userid,
        designation,
        setInhomeGraphs,
        setuserdetails,
        isLoggedIn,
        setIsLoggedIn,
        setUserid,
        setDesignation,
        getuserdetails,
        LogOut
      }}
    >
      {props.children}
    </usercontext.Provider>
  );
};

export default Authcontext;
