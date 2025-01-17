const axios = require('axios');
const pdf = require('pdf-parse');

exports.getPdfText = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Fetch the PDF file as binary data
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Parse the PDF document
        const data = await pdf(response.data);

        // Return extracted text with formatting preserved
        res.status(200).json({
            success: true,
            formattedText: data.text,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to extract text from PDF' });
    }
};
