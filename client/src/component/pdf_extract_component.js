import React from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import pdfImage from '../assets/pdf-bg.png';
import axios from 'axios';

function PdfExtract({ setOutput }) {

  const [loading, setLoading] = useState(false);

  const extractText = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/api/v1/pdftext', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response
      console.log('Text extraction response:', response.data.formattedText);
      setOutput(response.data.formattedText);
    } catch (err) {
      console.error('Error extracting text:', err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('File selected:', file);
    extractText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf', // Restrict file selection to PDFs only
  });

  return (
    <div className="flex border-2 border-gray-500 h-1/2 justify-center items-center bg-white">
      <button
        {...getRootProps()} 
        className="flex flex-col justify-center items-center max-w-full max-h-full text-center p-6"
      >
        <input
          {...getInputProps()}
          accept=".pdf"  
        />
        <img
          src={pdfImage}
          alt="img"
          className="max-w-xs max-h-24 object-contain mb-2"
        />
        <div className='border-2 rounded-lg px-5 py-1 border-black mb-2'>{!loading ? <p>Extract Pdf Text</p> : <p>Extracting...</p>}</div>
        <h1 className="text-sm font-normal">
          Drag And Drop or Click To Select Pdf And Extract Text With Exact Formatting
        </h1>
      </button>
    </div>
  );
}

export default PdfExtract;
