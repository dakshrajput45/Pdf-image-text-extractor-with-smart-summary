const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HF_API_KEY); // Ensure you set HF_API_KEY in your .env file

exports.getSummary = async (text, length) => {
    try {
        const response = await hf.summarization({
            model: 'google/pegasus-xsum',
            inputs: text,
            parameters: {
                max_length: length + 50, // Add buffer to max length
                min_length: length,
            },
        });

        if (response && response.summary_text) {
            return response.summary_text;
        } else {
            throw new Error('Failed to generate summary');
        }
    } catch (error) {
        console.error('Error generating summary:', error);
        throw error;
    }
};
