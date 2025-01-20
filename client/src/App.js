import { useContext} from 'react';
import { AppContext } from './context/appContext';
import ExtractOutput from './component/extract_output_component';
import ImageExtractOcr from './component/image_extract_component';
import PdfExtract from './component/pdf_extract_component';
import SmartSummary from './component/smart_summary_component';

function App() {
  const {loadingSummary,summary} = useContext(AppContext);
  return (
    <div className="flex flex-col justify-between h-screen m-2">
      <div className='flex items-center text-center justify-center w-full border-2 my-4 py-4' style={{ backgroundColor: 'rgb(102, 180, 110)' }}>
        <h1 className='text-xl font-medium uppercase text-white' >
          Unthinkable Solutions Test App
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between h-full m-2 md:m-4">
        <div className='flex flex-row md:flex-col justify-between w-full md:w-1/3 md:h-full md:mr-2 mb-2'>
          <PdfExtract />
          <ImageExtractOcr />
        </div>
        <div className='flex flex-col w-full md:w-2/3'>
          <ExtractOutput />
          {loadingSummary || summary ? <SmartSummary /> : ""}
        </div>
      </div>

    </div>
  );
}

export default App;