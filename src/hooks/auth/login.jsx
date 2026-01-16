import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import ApiRequest from "../../services/axios";
import { setUserDetails, setToken } from "../../redux/slice/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await schema.validate({ email, password }, { abortEarly: false });
      const payload = {
        email: email,
        password: password,
      };
      setLoader(true);
      const { success, data, token } = await ApiRequest.post(
        "/auth/login-user",
        payload
      );
      if (success) {
        dispatch(setUserDetails(data));
        dispatch(setToken(token));
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      if (error.inner) {
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setValidationErrors(errors);
        setTimeout(() => {
          setValidationErrors({});
        }, 4000);
        setLoader(false);
      }
      toast.error(error.response.data.message);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  // Google auth handlers
  const responseGoogleLogin = async (codeResponse) => {
    try {
      setGoogleLoader(true);
      try {
        const { success, data, token } = await ApiRequest.get(
          "/auth/google-login?code=" + codeResponse.code
        );
        if (success) {
          dispatch(setUserDetails(data));
          dispatch(setToken(token));
          navigate("/");
        }
      } catch (error) {
        console.log("server error", error);
        // toast.error(error.response.data.message);
      } finally {
        setGoogleLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      setGoogleLoader(false);
    }
  };

  const GoogleSignIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      responseGoogleLogin(codeResponse);
    },
    onError: (error) => {
      console.log("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    },
    flow: "auth-code",
    redirect_uri: window.location.origin,
  });

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
    googleLoader,
    loader,
    GoogleSignIn,
    validationErrors,
  };
};

export default useLogin;
