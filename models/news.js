/**
 * 新闻表
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let News = new Schema({
    title: String,
    tag: [{
        type: String,
        default: null
    }],
    img_url: String,
    content: String,
    create_user: String,
    create_time: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('News', News);