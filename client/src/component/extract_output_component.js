import React, { useState,useEffect } from 'react';
import axios from 'axios';
import aiIcon from '../assets/ai.png';
import { toast } from 'react-toastify';

function ExtractOutput({ output, setSummary, setLoadingSummary }) {
  const [len, setLen] = useState('');
  const [drop, setDrop] = useState(false);

  const genrateSmartSummary = async () => {
    try {
      toast.info('Generating summary');
      setLoadingSummary(true);
      const response = await axios.post('http://localhost:5000/api/v2/getsummary', {
        text: output,
        length: len
      });

      if (response.data && response.data.summary) {
        toast.success('Summary generated successfully');
        console.log('Summary response:', response.data.summary);
        setSummary(response.data.summary);
      } else {
        toast.error('Failed to generate summary');
        console.error('Summary not found in response:', response.data);
      }
    } catch (error) {
      toast.error('Failed to generate summary');
      console.error('Error generating summary:', error);
    } finally{
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (output && len) {
      genrateSmartSummary();
    }
  }, [output,len]);

  return (
    <div className='flex flex-col w-full h-full overflow-auto p-4 border-2 border-gray-300 shadow-md bg-gray-100'>
      <h1 className='text-center text-2xl font-semibold mt-2 mb-4 bg-white p-4'>Extract Output Component</h1>
      {output ? (
        <pre className='whitespace-pre-wrap p-4 bg-white'>{output}</pre>
      ) : (
        <div className='text-center text-gray-500 mt-10'>
          <p>Please upload a file to see the extracted text.</p>
        </div>
      )}
      {output && (
        <div className='absolute bottom-32 right-20'>
          {drop ? (
            <select
              value={len}
              onChange={async (e) => {
                const newLen = e.target.value;
                setLen(newLen);
              }}
              className='border-2 border-gray-300 rounded-lg p-2 capitalize'
            >
              <option value='short'>Short</option>
              <option value='medium'>Medium</option>
              <option value='long'>Long</option>
            </select>
          ) : (
            <button
              onClick={() => {
                setDrop(true)
                genrateSmartSummary();
              }}
              className='border-2 rounded-full p-1 border-black justify-end items-end bg-white'
            >
              <img src={aiIcon} alt="icon" className='h-10' />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ExtractOutput;