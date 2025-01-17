import React from 'react';

function ExtractOutput({ output }) {
  return (
    <div className='w-full overflow-auto p-4 border-2 border-gray-300 shadow-md bg-gray-100'>
      <h1 className='text-center text-2xl font-semibold mt-2 mb-4 bg-white p-4'>Extract Output Component</h1>
      {output ? (
        <pre className='whitespace-pre-wrap p-4 bg-white'>{output}</pre>
      ) : (
        <div className='text-center text-gray-500 mt-10'>
          <p>Please upload a file to see the extracted text.</p>
        </div>
      )}
    </div>
  );
}

export default ExtractOutput;