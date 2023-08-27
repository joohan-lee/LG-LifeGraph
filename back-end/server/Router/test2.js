
//test.js
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    //res.send("Welcome team-LG! ");
    res.send({test : "Welcome team-LG!"});
});

router.post("/eventAdd", (req, res) => {
    // res.send({test : "eventAdd test"});
    const formData = req.body;
    // console.log('req :', req);
    // console.log('req.body :', req.body);
    // console.log('FormData received:', formData);
    
    // If formData was well received, send a response back to the client
    res.send({ message: 'FormData received and processed.' });
});

module.exports = router;