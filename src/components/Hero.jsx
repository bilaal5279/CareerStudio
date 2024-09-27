import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <div className='max-w-screen-xl mt-hero w-full h-screen mx-auto text-center flex flex-col justify-center text-primary'>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-npm mx-auto mb-6'>
          Supercharge Your Resume
        </h1> 
        <p className='md:text-5xl sm:text-4xl text-xl font-light mb-8'>
          with CareerStudio your path to career <br/>advancement
        </p>
        <button className='bg-[#1A2F4F] text-white py-3 px-10 rounded-xl w-48 font-bold mx-auto my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out'>
          
          <Link to='/login'>
          Get Started
          </Link>
        </button>
        <p className='md:text-2xl sm:text-xl text-lg font-extralight mt-8'>
          Try it free. No credit card required.
        </p>
      </div>
    </div>
  );
};






export default Hero;