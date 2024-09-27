import React from 'react'





const Finish = () => {
  return (
    <div>
      <div className='max-w-screen-xl mt-hero w-full h-30 mx-auto text-center flex flex-col mt-24 text-primary'>
        <h1 className='md:text-5xl sm:text-4xl text-2xl font-regular mx-auto mb-6 text-[#1A2F4F]'>
          Your Optimized Resume and Cover Letter Are Ready
        </h1>
        <p className='md:text-3xl sm:text-2xl text-xl font-extralight mt-0'>
          You should receive an email shortly.
        </p>
        <div className='flex justify-center space-x-4'>
          <button className='bg-[#1A2F4F] text-white py-3 px-10 rounded-xl w-48 font-bold my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out'>
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};


export default Finish;