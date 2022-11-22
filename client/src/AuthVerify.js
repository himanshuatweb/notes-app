import { useEffect } from "react";
import {useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from './features/auth/authSlice';
import { resetTask } from './features/taskSlice';

const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const AuthVerify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {tasks} = useSelector(state => state.task);
    console.log(tasks);
  
    useEffect(() => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      console.log("in auth Verify ");
  
      if (profile) {
        const decodedJwt = parseJwt(profile?.token);
        console.log(decodedJwt)
        if (decodedJwt.exp * 5000 < Date.now()) {
            console.log("JWT Expired ");
            dispatch(resetTask());
            dispatch(removeAuth());
            navigate('/signin')
        }
        else{
            console.log("JWT NOT EXPIRED")
        }
      }else{
        console.log("If not profile in authVerify.js")
        dispatch(removeAuth());
      }
     
    //   if(profile){
    //      console.log('if profile in authverify.js');
    //       setTimeout(()=>{
    //         dispatch(resetTask());
    //         dispatch(removeAuth());
    //         navigate('/signin')
    //       },1000*60)

    //   }

    });
    // [location, props, tasks]
  
    return ;
  };
  
  export default AuthVerify;