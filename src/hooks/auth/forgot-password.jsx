import React, { useState } from 'react'

const useForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log('Forgot Password:', { email })
    setIsSubmitted(true)
  }

  return {
    email,
    setEmail,
    isSubmitted,
    setIsSubmitted,
    handleSubmit,

  }
}

export default useForgotPassword