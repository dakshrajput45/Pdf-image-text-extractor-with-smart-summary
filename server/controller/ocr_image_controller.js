const Tesseract = require('tesseract.js');
const axios = require('axios');



exports.getImageText = async (req, res) => {
    const { url} = req.query;
    const langCode = req.langCode;
    console.log(langCode);

    try {
        // Fetch the image from the URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Use Tesseract to recognize text from the image
        Tesseract.recognize(imageBuffer, langCode, {
            logger: (m) => console.log(m), 
        })
        .then(({ data: { text } }) => {
            res.status(200).json({
                success: true,
                text: text,
            });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to extract text from image' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image from URL' });
    }
};