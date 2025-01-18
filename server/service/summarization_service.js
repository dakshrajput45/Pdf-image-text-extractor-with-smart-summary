const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HF_API_KEY);

exports.getSummary = async (text, length) => {
    try {
        const response = await hf.summarization({
            model: 'google/pegasus-cnn_dailymail',
            inputs: text,
            parameters: {
                max_length: length + 50,
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
