const cloudinary = require('cloudinary').v2;
const fileType = require('file-type'); 
const fs = require('fs');


exports.uploadToCloudinary = async (req, res,next) => {
    try {
        const file = req.files.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the file
        const fileBuffer = fs.readFileSync(file.tempFilePath);
        const type = await fileType.fromBuffer(fileBuffer);
        if (!type) {
            return res.status(400).json({ error: 'Could not determine file type' });
        }

        const resourceType = type.ext === 'pdf' ? 'raw' : 'image';
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: resourceType,
            folder: "unthinkable_uploads"
        });

        // Delete the temporary file
        fs.unlinkSync(file.tempFilePath);
        //console.log('File uploaded to Cloudinary:', result.secure_url);
        req.query.url = result.secure_url;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message,
        });
    }
};