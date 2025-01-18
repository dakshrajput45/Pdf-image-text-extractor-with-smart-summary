import { useState } from 'react';
import ExtractOutput from './component/extract_output_component';
import ImageExtractOcr from './component/image_extract_component';
import PdfExtract from './component/pdf_extract_component';
import SmartSummary from './component/smart_summary_component';

function App() {
  const [output, setOutput] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className='flex items-center text-center justify-center w-full border-2 my-4 py-4' style={{ backgroundColor: 'rgb(102, 180, 110)' }}>
        <h1 className='text-xl font-medium uppercase text-white' >
          Unthinkable Solutions Test App
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between h-screen m-4">
        <div className='flex flex-row md:flex-col justify-between w-full md:w-1/3 md:h-full xl:mr-2 mb-2'>
          <PdfExtract setOutput={setOutput} />
          <ImageExtractOcr setOutput={setOutput} />
        </div>
        <div className='flex flex-col w-full md:w-2/3'>
          <ExtractOutput output={output} setSummary={setSummary} summary={summary} setLoadingSummary={setLoadingSummary}/>
          {loadingSummary || summary ? <SmartSummary summary={summary} loadingSummary={loadingSummary}/> : ""}
        </div>
      </div>

    </div>
  );
}

export default App;