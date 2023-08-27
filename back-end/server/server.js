//server.js
const express = require('express');
//const proxy = require('http-proxy-middleware');
const app = express();
const test = require('./Router/test2');
// const multer = require('multer');


const cors = require('cors');
app.use(cors()); // allow all domains.
app.use(express.json())
// 

app.use('/api', test);

const port = 8080; //node 서버가 사용할 포트 번호, 리액트의 포트번호(3000)와 충돌하지 않게 다른 번호로 할당
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})