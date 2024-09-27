import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../fire';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';

const JobDescription = ({ onCopyButtonClick }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading animation
  const navigate = useNavigate();

  const fileUpload = async () => {
    setIsLoading(true); // Set loading state to true

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('jobDescription', file);

    try {
      // Send a POST request to the backend with the file data
      const response = await axios.post('/api/convert/jobDescription', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the converted text from the response
      const { text } = response.data;
      if (!text) {
        console.error('Failed to extract text from Word file');
        alert('Failed to extract text from Word file');
        setIsLoading(false); // Set loading state back to false
        return;
      }

      // Upload the text to Firebase
      const fileData = new Blob([text], { type: 'text/plain' });
      const fileref = ref(storage, `/JobDescriptions/${file.name.split('.').slice(0, -1).join('')}_${v4()}${file.name.substr(file.name.lastIndexOf('.'))}`);
      await uploadBytes(fileref, fileData);
      console.log('File uploaded successfully:', fileref.fullPath);
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
      setIsLoading(false); // Set loading state back to false
    }
  };

  const [fileName, setFileName] = useState(null);

  const handleFileInput = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (
        uploadedFile.type === 'application/pdf' ||
        uploadedFile.type === 'application/msword' ||
        uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleRemoveClick = () => {
    setFile(null);
  };

  const handleNextClick = async () => {
    if (file) {
      try {
        navigate('/completed');
      } catch (error) {
        console.log(error);
        alert('Failed to upload file');
      }
    } else {
      alert('Please upload a file before clicking Finish');
    }
  };

  const handleFileUploadAndNext = async () => {
    await fileUpload();
    handleNextClick();
  };

  return (
    <div className="max-w-screen-xl mt-hero w-full h-screen mx-auto text-center flex flex-col mt-64 text-primary">
      <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold py-10 justi">Upload a Job Description</h1>
      <button
        className="bg-[#1A2F4F] text-white py-3 px-10 rounded-md w-72 h-[55px] font-semibold mx-auto my-6 bg-primary md:text-2xl sm:text-xl text-lg"
        onClick={() => document.getElementById('fileInput').click()}
      >
        Upload File
      </button>
      <input type="file" accept=".pdf,.doc,.docx" id="fileInput" className="hidden" onChange={handleFileInput} />
      {file ? (
        <div className="flex flex-row items-center justify-center">
          <p className="text-[#1A2F4F] font-light mr-2">{file.name}</p>
          <button className="outline-none" onClick={handleRemoveClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#FF4B4B] hover:text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.354 13.646a.5.5 0 01-.708.708L10 10.707l-3.646 3.647a.5.5 0 01-.708-.708L9.293 10l-3.647-3.646a.5.5 0 01.708-.708L10 9.293l3.646-3.647a.5.5 0 01.708.708L10.707 10l3.647 3.646z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <p className="text-[#1A2F4F] font-light ">Please upload a document</p>
      )}
      <p className="text-[#1A2F4F] font-light ">or just drag and drop pdf files here</p>
      <button className="text-[#1A2F4F] font-regular underline mt-2 " onClick={onCopyButtonClick}>
        Copy and paste instead
      </button>
      <div className="absolute inset-x-0 bottom-12 h-16 ">
        <button
          className="bg-[#1A2F4F] text-white py-3 px-10 rounded-md w-36 font-bold ml-3 my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleFileUploadAndNext}
        >
          {isLoading ? 'Loading...' : 'Finish'} {/* Render loading state */}
        </button>
      </div>
    </div>
  );
};

export default JobDescription;
