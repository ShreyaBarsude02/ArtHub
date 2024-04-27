const connectMongoDB = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const {app, server} = require("./socket/socket")

connectMongoDB();
const port = 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
// app.use(bodyParser.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/shops', require('./routes/shops'));
app.use(express.static('uploads'));

server.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});