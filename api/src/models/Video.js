const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        //default: 1,
    },
    deslike: {
        type: Number,
        //default: 1,
    },
});

VideoSchema.plugin(mongoosePaginate);

mongoose.model('Video', VideoSchema);