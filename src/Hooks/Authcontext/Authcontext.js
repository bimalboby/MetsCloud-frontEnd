import Axios from "Config/Axios/Axios";
import React, { createContext, useEffect, useState } from "react";

export const usercontext = createContext();

const Authcontext = (props) => {
  const [userdetails, setuserdetails] = useState({});
  const [userid, setUserid] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  console.log(userdetails);

  const getuserdetails = async (uid,des) => {
    let res = await Axios.post(
      `/iiot-userconfig?userid=${uid}&designation=${des}`
    );
    res.data["designation"] = userdesignnation[res.data.designation];
    setuserdetails(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    setUserid(localStorage.getItem("id"));
    setDesignation(localStorage.getItem("designation"));
    getuserdetails(localStorage.getItem("id"),localStorage.getItem("designation"));
  }, []);

  return (
    <usercontext.Provider
      value={{
        userdetails,
        userid,
        designation,
        setuserdetails,
        isLoggedIn,
        setIsLoggedIn,
        setUserid,
        getuserdetails
      }}
    >
      {props.children}
    </usercontext.Provider>
  );
};

export default Authcontext;
