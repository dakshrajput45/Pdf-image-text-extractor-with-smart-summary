import React, { useContext } from 'react';
import Loader from '../assets/loader';
import { AppContext } from '../context/appContext';

function SmartSummary() {
  const {summary,loadingSummary} = useContext(AppContext);
  return (
    <div className='flex flex-col mt-2 w-full max-w-screen-lg h-[50vh] md:h-full overflow-auto p-4 border-2 border-gray-500 shadow-md bg-white mx-auto'>
      <h1 className='text-center text-xl md:text-2xl font-semibold mt-2 mb-4 bg-gray-200 p-4'>Smart Summary</h1>
      {summary && !loadingSummary ? (
        <div className='flex text-black mt-6 max-w-full'>
          <pre className='whitespace-pre-wrap break-words bg-white w-full'>{summary}</pre>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <Loader />
          Please wait for a while !!
        </div>
      )}
    </div>
  );
}

export default SmartSummary;