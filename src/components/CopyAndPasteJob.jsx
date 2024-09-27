import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../fire';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const CopyAndPasteJob = ({ onBackButtonClick }) => {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();
  const handleUpload = async () => {
    const contentType = 'text/plain';
    const blob = new Blob([jobDescription], { type: contentType });
    const fileref = ref(storage, `/JobDescriptions/${CopyAndPasteJob.name + v4()}`);
    await uploadBytes(fileref, blob);
  };

  const handleFinishedButtonClick = async () => {
    if (jobDescription) {
      try {
        navigate('/completed');
      } catch (error) {
        console.log(error);
        alert("Failed to upload job description");
      }
    } else {
      alert("Please paste a job description before clicking Next");
    }
  };
  
  const handleFileUploadAndNext = async () => {
    await handleUpload();
    handleFinishedButtonClick();
  };

  return (
    <div className='max-w-screen-xl mt-hero w-full h-screen mx-auto text-center flex flex-col mt-64 text-primary'>
      <h1 className='md:text-5xl sm:text-4xl text-3xl font-bold py-10 justi'>Copy and Paste a job Description</h1>
      <div className='flex items-center justify-center w-full'>
        <div className='max-w-lg w-full bg-white rounded-lg shadow-lg'>
          <textarea
            className='w-full h-48 p-4 text-gray-700 leading-tight resize-none'
            placeholder='Paste job description here...'
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
          ></textarea>
        </div>
      </div>
      <button className='text-[#1A2F4F] font-regular underline mt-2' onClick={onBackButtonClick}>
        Upload Instead
      </button>
      <div className='absolute inset-x-0 bottom-12 h-16 '>
        <button
          className='bg-[#1A2F4F] text-white py-3 px-10 rounded-md w-36 font-bold ml-3 my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out'
          onClick={handleFileUploadAndNext}
        >
        Finish
        </button>
      </div>
    </div>
  );
};

export default CopyAndPasteJob;
