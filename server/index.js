const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const fileupload = require("express-fileupload");


app.use(express.json());
app.use(cors());

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect()


// Routes
const uploadRoute = require("./routes/upload_route");
const extractRoute = require("./routes/extract_route");
const summaryRoute = require("./routes/summary_route");
app.use('/api/v1', uploadRoute);
app.use('/api/v2', extractRoute);
app.use('/api/v3', summaryRoute);


app.listen(process.env.PORT, () => {
	console.log(`App is running at ${process.env.PORT}`);
	console.log(`http://localhost:${process.env.PORT}/`);
});