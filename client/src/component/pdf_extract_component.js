import React, { useContext } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import pdfImage from '../assets/pdf-bg.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/appContext';

function PdfExtract() {
 
  const {apiUrl,loadingPdf, setLoadingPdf,setOutput} = useContext(AppContext);

  const extractText = async (file) => {
    try {
      setLoadingPdf(true);
      toast.info('Extracting Text');

      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${apiUrl}/api/v1/pdftext`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //console.log('Text extraction response:', response.data.formattedText);
      toast.success('Text extracted successfully');
      setOutput(response.data.formattedText);
    } catch (err) {
      toast.error('Failed to extract text');
      console.error('Error extracting text:', err);
    } finally {
      setLoadingPdf(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    //console.log('File selected:', file);
    extractText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
  });

  return (
    <div className="flex mr-2 border-2 border-gray-500 h-52 md:h-1/2 w-1/2 md:w-full justify-center items-center bg-white md:mb-2">
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
          className="max-w-xs max-h-20 object-contain mb-2"
        />
        <div className='border-2 rounded-lg md:px-5 px-1 py-1 border-black mb-2 '>{!loadingPdf ? <p>Extract Pdf Text</p> : <p>Extracting...</p>}</div>
        <h1 className="text-sm font-normal hidden md:block">
          Drag And Drop or Click To Select Pdf And Extract Text With Exact Formatting
        </h1>
      </button>
    </div>
  );
}

export default PdfExtract;
