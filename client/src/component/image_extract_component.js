import img from '../assets/img.jpeg';

function ImageExtractOcr({setOutput}) {
    return (
        <div className='flex border-2 border-gray-500 h-1/2 justify-center items-center bg-white'>
            <button className='flex flex-col justify-center items-center max-w-full max-h-full' onClick={() => console.log('Image Extract OCR')}>
                <img src={img} alt="img" className='max-w-xs max-h-20 object-contain' />
                <h1 className='text-sm font-normal uppercase mt-5'>Click and upload Image and extract text of different language</h1>
            </button>
        </div>
    );
}

export default ImageExtractOcr;