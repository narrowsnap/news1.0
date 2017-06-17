/**
 * Created by richard on 17-6-15.
 */
/**
 * 管理员表
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', AdminSchema);