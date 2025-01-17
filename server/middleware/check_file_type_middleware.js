const fileType = require('file-type');
const fs = require('fs');

exports.fileTypeCheck = async (req, res, next) => {
    try {
        const file = req.files?.file;
        const typeClient = req.body.type;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the file
        const fileBuffer = fs.readFileSync(file.tempFilePath);

        // Determine file type from buffer
        const type = await fileType.fromBuffer(fileBuffer);
        if (!type) {
            return res.status(400).json({ error: 'Could not determine file type' });
        }

        // Validate file type based on typeClient
        if (typeClient === 'pdf' && type.ext !== 'pdf') {
            return res.status(400).json({ error: 'File is not a PDF' });
        } else if (typeClient === 'image' && !['jpg', 'jpeg', 'png', 'gif'].includes(type.ext)) {
            return res.status(400).json({ error: 'File is not a valid image (jpg, jpeg, png, gif)' });
        }

        // Set resource type based on file type
        req.resourceType = typeClient === 'image' ? 'image' : 'raw';

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Type checking failed',
            error: error.message,
        });
    }
};