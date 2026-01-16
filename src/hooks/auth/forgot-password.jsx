import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ApiRequest from '../../services/axios'
import * as yup from 'yup';

const useForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loader, setLoader] = useState(false)
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  })
  const [validationErrors, setValidationErrors] = useState({});
  const handleSubmit = async(e) => {
  try {
    setLoader(true)
    e.preventDefault()
    await schema.validate({ email }, { abortEarly: false });
    const payload = {
      email: email
    }
    const { success, message } = await ApiRequest.post('/auth/forgot-password', payload)
    if (success) {
      setEmail('')
      setIsSubmitted(true)
    }
    setIsSubmitted(true)
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
      setLoader(false)
    }
  }

  return {
    email,
    setEmail,
    isSubmitted,
    setIsSubmitted,
    handleSubmit,
    loader,
    validationErrors

  }
}

export default useForgotPassword