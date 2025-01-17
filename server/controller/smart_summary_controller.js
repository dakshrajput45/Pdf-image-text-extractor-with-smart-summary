const { getSummary } = require('../service/summarization_service');


const summaryLengths = {
    short: 25,
    medium: 100,
    long: 200,
};

exports.generateSummary = async (req, res) => {
    const { text, length } = req.body;
    //console.log('length:', length);
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const maxTokens = summaryLengths[length] || summaryLengths.medium;
    try {
        getSummary(text, maxTokens)
            .then((summary) => res.status(200).json({
                success: true,
                summary: summary,
            }))
            .catch((error) => res.status(400).json({
                success: false,
                error: error.message,
            }));

    } catch (error) {
        //console.error('Error generating summary:', error);
        res.status(500).json({ error: 'Failed to generate summary' });
    }
};
