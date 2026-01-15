import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import ApiRequest from "../../services/axios";
import { setUserDetails, setToken } from "../../redux/slice/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        email: email,
        password: password,
      };
      setLoader(true);
      const { success, data, token } = await ApiRequest.post(
        "/login-user",
        payload
      );
      if (success) {
        dispatch(setUserDetails(data));
        dispatch(setToken(token));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message);
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
          toast.success("Login successful");
          navigate("/");
        }
      } catch (error) {
        console.log("server error", error);
        // toast.error(error.response.data.message);
        setError(true);
        setErrorMessage(error.response.data.message);
      } finally {
        setGoogleLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
      setError(true);
      setErrorMessage(error.response.data.message);
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
    error,
    errorMessage,
    loader,
    GoogleSignIn,
  };
};

export default useLogin;
