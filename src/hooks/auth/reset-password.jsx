import React, { useState } from "react";
import * as yup from "yup";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ApiRequest from "../../services/axios";

const useResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const schema = yup.object().shape({
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
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    try {
      await schema.validate(formData, { abortEarly: false });

      if (!token) return toast.error("Invalid token");
      setLoader(true);
      // Validation passed
      setValidationErrors({});
      const payload = {
        password: formData.password,
      };
      const { success, message } = await ApiRequest.put(
        "/auth/reset-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (success) {
        setIsSubmitted(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
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
    }
  };

  console.log("validationErrors", validationErrors);

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSubmitted,
    setIsSubmitted,
    handleChange,
    handleSubmit,
    validationErrors,
    loader,
  };
};

export default useResetPassword;
