const cloudinary = require('cloudinary').v2;
const fs = require('fs');


exports.uploadToCloudinary = async (req, res) => {
    try {
        const file = req.files.file;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: req.resourceType,
            folder: "unthinkable_uploads"
        });

        // Delete the temporary file
        fs.unlinkSync(file.tempFilePath);

        // Respond with the result
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message,
        });
    }
};