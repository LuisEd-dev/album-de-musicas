const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/videos', {

    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(()=>console.log("DB server connect"))
    .catch(e => console.log("DB error", e));

requireDir('./src/models')

app.use('/api', require("./src/routes"));

app.listen(port)
