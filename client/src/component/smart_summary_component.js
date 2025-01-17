import React from 'react';
import Loader from '../assets/loader';

function SmartSummary({ summary, loadingSummary }) {
  return (
    <div className='flex flex-col w-full h-full overflow-auto p-4 border-2 border-gray-300 shadow-md bg-gray-100'>
      <h1 className='text-center text-2xl font-semibold mt-2 mb-4 bg-white p-4'>Smart Summary</h1>

      {summary && !loadingSummary ? (
        <div className='text-balance text-black mt-10'>
          <pre className='whitespace-pre-wrap p-4 bg-white'>{summary}</pre>
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-full'>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SmartSummary;