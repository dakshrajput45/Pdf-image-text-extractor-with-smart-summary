import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import img from '../assets/img.jpeg';
import langData from '../data/language_data';

function ImageExtractOcr({ setOutput }) {
  const [loading, setLoading] = useState(false);
  const [langSelected, setLangSelected] = useState('eng');

  const extractText = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', langSelected);  
      const response = await axios.post('http://localhost:5000/api/v1/imagetext', formData, {
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
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log('File selected:', file);
      extractText(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/jpg': [],
    },
  });

  return (
    <div className="flex flex-col border-2 border-gray-500 h-52 w-1/2 md:w-full md:h-1/2 bg-white">
      <div className="flex items-end justify-end mt-2 mr-2 ">
        <select
          value={langSelected}
          onChange={(e) => setLangSelected(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2"
        >
          {
            langData.map((lang, index) => (
              <option key={index} value={lang} className='capitalize'>{lang}</option>
            ))
          }
        </select>
      </div>
      <button
        {...getRootProps()}
        className="flex flex-col justify-center items-center max-w-full max-h-full text-center p-6"
      >
        <input
          {...getInputProps()}
          accept="image/jpeg, image/png, image/gif, image/jpg"
        />
        <img
          src={img}
          alt="img"
          className="max-w-xs max-h-16 object-contain mb-2"
        />
        <div className='border-2 rounded-lg md:px-5 px-1 py-1 border-black mb-2 '>{!loading ? <p>Extract Img Text</p> : <p>Extracting...</p>}</div>
        <h1 className="text-sm font-normal hidden md:block">
          Drag And Drop or Click To Select Image And Extract Text With Exact Formatting
        </h1>
      </button>
    </div>
  );
}

export default ImageExtractOcr;