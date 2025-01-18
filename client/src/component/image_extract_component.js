import img from '../assets/img.jpeg';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import langData from '../data/language_data';
import axios from 'axios';
import { toast } from 'react-toastify';

function ImageExtractOcr({ setOutput }) {
  const [loading, setLoading] = useState(false);
  const [langSelected, setLangSelected] = useState('english');

  const extractText = async (file) => {
    try {
      setLoading(true);
      toast.info('Extracting Text');
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`http://localhost:5000/api/v1/imagetext?language=${langSelected}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //console.log('Text extraction response:', response.data.text);
      toast.success('Text extracted successfully');
      setOutput(response.data.text);
    } catch (err) {
      toast.error('Failed to extract text');
      //console.error('Error extracting text:', err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    //console.log('File selected:', file);
    extractText(file);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="flex flex-col border-2 border-gray-500 h-52 md:h-full w-full bg-white xl:mt-2">
      <div className="flex items-end justify-end mt-2 mr-2">
        <select
          value={langSelected}
          onChange={(e) => setLangSelected(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 capitalize"
        >
          {
            langData.map((lang) => (
              <option value={lang} className='capitalize'>{lang}</option>
            ))
          }
        </select>
      </div>
      <div className='flex justify-center items-center h-full w-full'>
        <button
          {...getRootProps()}
          className="flex flex-col justify-center items-center max-w-full max-h-full text-center p-6"
        >
          <input
            {...getInputProps()}
            accept="image/*"
          />
          <img
            src={img}
            alt="img"
            className="max-w-xs max-h-16 object-contain mb-2"
          />
          <div className='border-2 rounded-lg md:px-5 px-1 py-1 border-black mb-2'>{!loading ? <p>Extract Pdf Text</p> : <p>Extracting...</p>}</div>
          <h1 className="text-sm font-normal hidden md:block">
            Drag And Drop or Click To Select Image And Language To Extract Text
          </h1>
        </button>
      </div>
    </div>
  );
}

export default ImageExtractOcr;