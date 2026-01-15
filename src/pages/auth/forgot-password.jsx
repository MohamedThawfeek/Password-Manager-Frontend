import React from 'react'
import { Link } from 'react-router-dom'
import useForgotPassword from '../../hooks/auth/forgot-password'

const ForgotPassword = () => {
  const {
    email,
    setEmail,
    isSubmitted,
    setIsSubmitted,
    handleSubmit,
  } = useForgotPassword()

  return (
    <div className='w-dvw min-h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
      <div className='w-full max-w-xl'>
        {/* Logo/Header Section */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Forgot Password?</h1>
          <p className='text-gray-600'>
            {isSubmitted
              ? 'Check your email for reset instructions'
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Input */}
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                    </svg>
                  </div>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200'
                    placeholder='you@example.com'
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Send Reset Link
              </button>

              {/* Back to Login Link */}
              <div className='text-center'>
                <Link
                  to='/login'
                  className='text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center gap-1'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                  </svg>
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className='space-y-6 text-center'>
              {/* Success Icon */}
              <div className='flex justify-center'>
                <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full'>
                  <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-gray-900'>Check your email</h2>
                <p className='text-gray-600'>
                  We've sent a password reset link to <span className='font-medium text-gray-900'>{email}</span>
                </p>
                <p className='text-sm text-gray-500 mt-4'>
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              {/* Resend Button */}
              <button
                type='button'
                onClick={() => setIsSubmitted(false)}
                className='w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
              >
                Resend Email
              </button>

              {/* Back to Login Link */}
              <div className='text-center'>
                <Link
                  to='/login'
                  className='text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors inline-flex items-center gap-1'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                  </svg>
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword