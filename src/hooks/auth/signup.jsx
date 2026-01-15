import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ApiRequest from '../../services/axios';
import { setToken, setUserDetails } from '../../redux/slice/user';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [googleLoader, setGoogleLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false)



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
   try {
    e.preventDefault()
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    setLoader(true);
    const {success, data, token} = await ApiRequest.post('/create-user', payload)
    if (success) {
      dispatch(setUserDetails(data));
      dispatch(setToken(token));
      toast.success("Signup successful");
      navigate('/');
    }
   } catch (error) {
    console.log("error", error);
    setErrorMessage(error.response.data.message);
   } finally {
    setLoader(false);
   }

  }


  const responseGoogleSignup = async (codeResponse) => {
    try {
      setGoogleLoader(true);
      try {
        const { success, data, token } = await ApiRequest.get(
          "/google-signup?code=" + codeResponse.code
        );
        if (success) {
          dispatch(setUserDetails(data));
          dispatch(setToken(token));
          navigate('/');
        }
      } catch (error) {
        console.log("server error", error);
        // toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setError(true);
      } finally {
        setGoogleLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
      setError(true);
    } finally {
      setGoogleLoader(false);
    }
  };



  const GoogleSignUp = useGoogleLogin({
    onSuccess: (codeResponse) => {
      responseGoogleSignup(codeResponse);
    },
    onError: (error) => {
      console.log("Google signup error:", error);
      toast.error("Google signup failed. Please try again.");
    },
    flow: "auth-code",
    redirect_uri: window.location.origin,
  });

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    googleLoader,
    error,
    errorMessage,
    success,
    GoogleSignUp,
    loader,
  }
}

export default useSignup