
//test.js
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    //res.send("Welcome team-LG! ");
    res.send({test : "Welcome team-LG!"});
});

module.exports = router;