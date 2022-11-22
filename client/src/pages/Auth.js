import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux'
import { signUpAsync ,signInAsync } from '../features/auth/authSlice'

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formSignin, setFormSignin] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {auth} = state;
  const {msg}  = auth;


  const navigate = useNavigate();

  useEffect(()=>{
    if(msg){
      window.alert(msg)
    }
  
  },[msg])

  useEffect(()=>{
    if(auth.authData !==null){
      console.log("In useEffect 34");
      navigate('/task')
    }
  },[auth?.authData])

  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(formSignin){
        console.log("Sign In ", {email:formData.email, password:formData.password})
        dispatch(signInAsync({email:formData.email, password:formData.password}))
    }else{
      dispatch(signUpAsync(formData))
      
    }

    
    setFormData({
      name:"",
      email:"",
      password:""
    })
  };

  const handleForm = () => {
    setFormSignin(!formSignin)
  };
  return (
    <div className="auth">
      <div className="signup">
        {formSignin ? (
          <div>
            <h2>Sign In</h2>
            <div className="email">
              <label htmlFor="email">Enter Email : </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="password">
              <label htmlFor="password">Enter Password : </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <h2>Sign Up</h2>
            <div className="name">
              <label htmlFor="name">Enter Name : </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="email">
              <label htmlFor="email">Enter Email : </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="password">
              <label htmlFor="password">Enter Password : </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="button">
          <button onClick={handleSubmit} >
             { formSignin ? "Login" : "Register" }
          </button>
        </div>

        <br />
        <br />
        <div className="registered">
          <button onClick={handleForm}>
              {formSignin ? "New User ? Click Here" :"Already Registered ? Click Here" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
