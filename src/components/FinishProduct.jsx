import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function FinishedProduct() {
  const [isLoading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetterUrl, setCoverLetterUrl] = useState('');

  useEffect(() => {
    // Make a request to your backend API to retrieve the resumeUrl and coverLetterUrl
    fetch('/api/convert/getUrls')
      .then(response => response.json())
      .then(data => {
        setResumeUrl(data.resumeUrl);
        setCoverLetterUrl(data.coverLetterUrl);
        setLoading(false); // Set loading to false after getting the URLs
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        {/* Render a loading state */}
        <p>Loading...</p>
      </div>
    );
  }

  const handleResumeDownload = () => {
    saveAs(resumeUrl, 'resume.pdf');
  };

  const handleCoverLetterDownload = () => {
    saveAs(coverLetterUrl, 'cover_letter.pdf');
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-2">
      {/* Render the resume and cover letter PDFs side by side */}
      <div className="shadow-lg m-2 pl-10">
        <h1 className="md:text-5xl sm:text-4xl text-2xl font-regular mx-auto mb-6 text-[#1A2F4F]">Resume</h1>
        <Document file={resumeUrl} renderMode="none">
          <Page pageNumber={1} renderAnnotationLayer={false} width={600} />
        </Document>
        <button
          className="bg-[#1A2F4F] text-white py-3 ml-5 px-10 rounded-xl w-48 font-bold my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleResumeDownload}
        >
          Download
        </button>
      </div>
      <div className="shadow-lg pl-10">
        <h1 className="md:text-5xl sm:text-4xl text-2xl font-regular mx-auto mb-6 text-[#1A2F4F]">Cover Letter</h1>
        <Document file={coverLetterUrl} renderMode="none">
          <Page pageNumber={1} renderAnnotationLayer={false} width={600} />
        </Document>
        <button
          className="bg-[#1A2F4F] text-white py-3 ml-5 px-10 rounded-xl w-48 font-bold my-6 bg-primary hover:bg-primary-700 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleCoverLetterDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default FinishedProduct;
