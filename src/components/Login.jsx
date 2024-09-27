import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from '../context/AuthContext';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn} = UserAuth();

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password);
      navigate('/upload')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
      <div className='max-w-screen-xl mx-auto text-center mb-10'>
          <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold py-10'>Welcome Back To Career Studio</h1>
          <p className='md:text-2xl sm:text-xl text-l font-light mb-10'>Login to your account</p>
          <div className='shadow-md rounded-md px-8 pt-6 pb-8 md:w-1/2 lg:w-1/3 mx-auto'>
              <form onSubmit={handleSubmit}>
                  <div className='mb-10'>
                      <input value={email} type="email" placeholder='Email Address' id="email" name="email" onChange={handleEmailChange} className='block border border-black rounded-md w-full py-3 px-4 text-lg' />
                  </div>
                  <div className='mb-10'>
                      <input value={password} type="password" placeholder='Password' id="Password" name="password" onChange={handlePasswordChange} className='block border border-black rounded-md w-full py-3 px-4 text-lg' />
                  </div>
                  <button type='submit' className='border-black border-2 bg-transparent hover:bg-black hover:text-white text-black font-bold py-3 px-6 rounded-md inline-flex items-center text-lg'>
                      Login to Your Account
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L13.586 11H3a1 1 0 1 1 0-2h10.586l-2.293-2.293a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                      </svg>
                  </button>
              </form>
              {error && <p className='text-red-500 my-3'>{error}</p>}
          </div>
          <button onClick={() => props.onFormSwitch('Register')} className='text-lg font-medium mt-3 text-gray-500 hover:text-black'>Don't have an account? Sign up here.</button>
      </div>
  )
}


  
  
export default Login;
