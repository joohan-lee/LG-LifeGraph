
//test.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
// Serve static files from the "uploads" directory
const path = require('path');

const router = express.Router();
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get("/", (req, res) => {
    //res.send("Welcome team-LG! ");
    res.send({test : "Welcome team-LG!"});
});


// Configure multer disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the directory where uploaded files will be stored
        // cb(null, 'uploads/');
        cb(null, path.join(__dirname, '../../client/public/img'));
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    }
});

const upload = multer({ storage });

router.post("/eventAdd", 
    upload.fields([
        { name: 'selectedFile', maxCount: 1 }, // File field
    ])
    ,(req, res) => {
        const eventName = req.body.eventName;
        const dateRange_start = req.body.dateRange_start;
        const dateRange_end = req.body.dateRange_end;
        const category = req.body.category;
        const emotionalScore = req.body.emotionalScore;
        const eventNote = req.body.eventNote;
        const uploadedFile = req.files['selectedFile'][0];

        console.log('Uploaded eventName:', eventName);
        console.log('Uploaded dateRange_start:', dateRange_start);
        console.log('Uploaded dateRange_end:', dateRange_end);
        console.log('Uploaded category:', category);
        console.log('Uploaded emotionalScore:', emotionalScore);
        console.log('Uploaded eventNote:', eventNote);
        console.log('Uploaded File:', uploadedFile);

        let existingData = [];
        let existingPoints = [];
        try {
            // Read the existing JSON data from the file
            const rawData = fs.readFileSync('events.json');
            const rawPoints = fs.readFileSync('points.json');
            existingData = JSON.parse(rawData);
            existingPoints = JSON.parse(rawPoints);
            if (!Array.isArray(existingData)) {
                existingData = []; // Initialize as an array if not already
            }
            if (!Array.isArray(existingPoints)) {
                existingPoints = []; // Initialize as an array if not already
            }
        } catch (error) {
            // If the file doesn't exist or is not valid JSON, start with an empty array
        }

        const receivedFormData = {
            'id': existingData.length + 1,
            'eventName': eventName,
            'dateRange_start': dateRange_start,
            'dateRange_end': dateRange_end,
            'category': category,
            'emotionalScore': emotionalScore,
            'eventNote': eventNote,
            'uploadedFile': uploadedFile
        };

        const newPoint = {
            'x': (existingPoints.length + 1).toString(),
            'y': parseInt(emotionalScore),
            'pic': '/img/' + uploadedFile.filename,
            'name': eventName
        };

        // Append the new data to the existing data
        existingData.push(receivedFormData);
        existingPoints.push(newPoint);

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(existingData, null, 2); // Pretty-print with 2 spaces
        const jsonPoints = JSON.stringify(existingPoints, null, 2); // Pretty-print with 2 spaces

        // Write the updated JSON data back to the file
        fs.writeFileSync('events.json', jsonData);
        fs.writeFileSync('points.json', jsonPoints);
        

        // res.status(200).json({ message: 'Data uploaded successfully' });
        
        // If formData was well received, send a response back to the client
        res.send({ message: 'FormData received and processed.' });
});

router.get("/eventRead", (req, res) => {
    // const testData = [
    //     { x: "1", y: 13, pic: "http://localhost:8080/img/img1.png", name: "soccer" },
    //     { x: "2", y: 44, pic: "http://localhost:8080/img/img2.png", name: "trip2" },
    //     { x: "3", y: 27, pic: "http://localhost:8080/img/img3.png", name: "trip3" },
    //     { x: "4", y: 93, pic: "http://localhost:8080/img/img4.png", name: "trip4" },
    //     { x: "5", y: -87, pic: "http://localhost:8080/img/img5.png", name: "trip5" },
    //     { x: "6", y: -50, pic: "http://localhost:8080/img/img6.png", name: "trip6" },
    //     { x: "7", y: 27, pic: "http://localhost:8080/img/img7.png", name: "trip7" },
    //     { x: "8", y: 68, pic: "http://localhost:8080/img/img8.png", name: "trip8" },
    //     { x: "9", y: -13, pic: "http://localhost:8080/img/img9.png", name: "trip9" },
    //     { x: "10", y: 54, pic: "http://localhost:8080/img/img10.png", name: "trip10" },
    //     { x: "11", y: 57, pic: "http://localhost:8080/img/img11.png", name: "marriage" },
    //     { x: "12", y: 42, pic: "http://localhost:8080/img/img12.png", name: "retirement" },
    // ];

    let existingData = [];
    try {
        // Read the existing JSON data from the file
        const rawData = fs.readFileSync('points.json');
        existingData = JSON.parse(rawData);
        if (!Array.isArray(existingData)) {
            existingData = []; // Initialize as an array if not already
        }
    } catch (error) {
        // If the file doesn't exist or is not valid JSON, start with an empty array
    }

    // Convert the updated data to JSON format
    // const jsonData = JSON.stringify(existingData, null, 2); // Pretty-print with 2 spaces

    res.send(existingData);
    // res.send([{message: 'textsss'}]);
});

module.exports = router;