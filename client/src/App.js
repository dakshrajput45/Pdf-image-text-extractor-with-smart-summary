import { useState } from 'react';
import ExtractOutput from './component/extract_output_component';
import ImageExtractOcr from './component/image_extract_component';
import PdfExtract from './component/pdf_extract_component';
import SmartSummary from './component/smart_summary_component';

function App() {
  const [output,setOutput] = useState('');
  return (
    <div className="flex flex-col justify-between h-screen border-2 border-gray-200 space-x-1">
      <div className='flex items-center text-center justify-center w-full border-2 my-4 py-4' style={{ backgroundColor: 'rgb(102, 180, 110)' }}>
        <h1 className='text-xl font-medium uppercase text-white' >
          Unthinkable Solutions Test App
        </h1>
      </div>
      <div className="flex flex-row justify-between h-full border-2 border-gray-200 p-4">
        <div className='flex flex-col justify-between w-full space-y-1 mr-2'>
          <PdfExtract setOutput={setOutput}/>
          <ImageExtractOcr setOutput={setOutput}/>
        </div>
        <div className='flex border-2 border-gray-500 w-full bg-gray-200'>
          <ExtractOutput output={output}/>
        </div>
      </div>

    </div>
  );
}

export default App;