import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ApiRequest from "../../services/axios";
import { setToken, setUserDetails } from "../../redux/slice/user";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain both uppercase and lowercase letters"
      )
      .matches(/^(?=.*[0-9])/, "Password must contain at least one number"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await schema.validate(formData, { abortEarly: false });
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      setLoader(true);
      const { success, data, token } = await ApiRequest.post(
        "/auth/create-user",
        payload
      );
      if (success) {
        dispatch(setUserDetails(data));
        dispatch(setToken(token));
        navigate("/");
      }
    } catch (error) {
      if (error.inner) {
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setValidationErrors(errors);
        setTimeout(() => {
          setValidationErrors({});
        }, 4000);
      }
    } finally {
      setLoader(false);
    }
  };

  const responseGoogleSignup = async (codeResponse) => {
    setGoogleLoader(true);
    try {
      const { success, data, token } = await ApiRequest.get(
        "/auth/google-signup?code=" + codeResponse.code
      );
      if (success) {
        dispatch(setUserDetails(data));
        dispatch(setToken(token));
        navigate("/");
      }
    } catch (error) {
      console.log("Google signup error:", error);
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

  console.log("validationErrors", validationErrors);
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
    GoogleSignUp,
    loader,
    validationErrors,
  };
};

export default useSignup;
