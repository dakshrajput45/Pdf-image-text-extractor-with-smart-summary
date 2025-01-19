# Getting Started With Pdf-image-text-extractor-with-smart-summary

## Introduction
This web application allows users to extract text from PDF files and images, and generate smart summaries of the extracted text. The application is built using React for the frontend and Node.js for the backend.

## Approach

For the initial setup, my priority was creating a clean codebase. I focused on structuring the project with clear separations —frontend components, Context, and assets were well-organized, while the backend had separate folders for routes, controllers, service and middlewares. This allowed for easy scaling and easier debugging.

I chose React.js for its flexibility and Tailwind CSS for its utility-first approach. For the drag-and-drop feature, I integrated React Dropzone, and used React Context API for state management to keep the code scalable.

On the backend, Cloudinary handled file uploads, and PDF-parse and Tesseract.js were used for text extraction and OCR. For smart summaries, I utilized the Google/pegasus-cnn_dailymail for smart summarization.

However, the journey has its hurdles. Working with third-party APIs for smart summarization was a challenge. Each API came with its own set of limitations. But i took the time to research through documentation ,Stack Overflow and testing various solutions. One key challenge was selecting the right model for summarization, where I sifted through multiple options before settling on Google/pegasus-cnn_dailymail for its ability to handle both short and long documents effectively. 
Despite these challenges, I tackled each one through careful research, ensuring that the app remains scalable and maintainable.

## Running the Web App
To successfully run this web app, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone <https://github.com/dakshrajput45/Pdf-image-text-extractor-with-smart-summary.git>
   cd <Pdf-image-text-extractor-with-smart-summary>
   ```
2. **Install dependencies**:
   - For the client:
     ```sh
     cd client
     npm install
     ```
   - For the server:
     ```sh
     cd server
     npm install
     ```
3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and add the following:
     ```
     PORT=5000
     CLOUD_NAME=<your-cloudinary-cloud-name>
     API_KEY=<your-cloudinary-api-key>
     API_SECRET=<your-cloudinary-api-secret>
     HF_API_KEY=<your-huggingface-api-key>
     ```
4. **Start the application**:
   - For the client:
     ```sh
     cd client
     npm start
     ```
   - For the server:
     ```sh
     cd server
     npm start
     ```

5. **Open the application**:
   - The client will be running at `http://localhost:3000`
   - The server will be running at `http://localhost:5000`


## Functionality
The web app provides the following functionalities:

1. **PDF Text Extraction**: Upload a PDF file to extract text with exact formatting.
2. **Image Text Extraction**: Upload an image to extract text using OCR (Optical Character Recognition). You can extract text in different languages by selecting the desired language.
3. **Smart Summary**: Generate a smart summary of the extracted text with options for short, medium, and long summaries.
4. **Drag and Drop**: Easily upload PDF files and images using the drag and drop feature.


## Technology Used

### Frontend
- React.js
- Tailwind CSS
- Context API
- Axios
- React Dropzone
- React Toastify

### Backend
- Node.js
- Express.js
- Cloudinary
- PDF Parse
- Hugging Face Inference API (google/pegasus-cnn_dailymail model) for smart summary
- Tesseract.js

### Deployment
- Netlify (Frontend)
- Render (Backend)


## Pros and Cons

### Pros
- Easy to use interface for extracting text from PDFs and images.
- Supports multiple languages for OCR.
- Supports Reading big documents likes research papers.
- Can Easily Handle large file due to Cloudinary support.
- Generates smart summaries with different lengths.
- Drag and drop feature for easy file uploads.
- Deployed on reliable platforms (Netlify and Render).

### Cons
- Limited to the languages supported by Tesseract.js.
- Dependent on external APIs (Cloudinary, Hugging Face) which may have usage limits.
- Performance may vary based on the size of the files uploaded.
- Can only generate summaries for English text due to model dependency on Hugging Face.

## Improvements
- Add support for more languages in generating smart summaries.
- Use Redux for better state management.
- Add more deployment options and CI/CD pipelines.
- Reduce dependency on external APIs by implementing in-house solutions.
- Add features for editing and exporting extracted text and summaries.


## Deployment Steps

### Frontend on Netlify
1. **Create a Netlify account** and link your GitHub repository.
2. **Deploy the site**:
   - Go to the Netlify dashboard and click on "New site from Git".
   - Select repository and branch.
   - Set the build command to `npm run build` and the publish directory to `build`.
   - Click on "Deploy site".

### Backend on Render
1. **Create a Render account** and link your GitHub repository.
2. **Deploy the server**:
   - Go to the Render dashboard and click on "New Web Service".
   - Select repository and branch.
   - Set the build command to `npm install` and the start command to `npm start`.
   - Add the required environment variables.
   - Click on "Create Web Service".
