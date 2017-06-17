/**
 * Created by richard on 17-6-14.
 */
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let Admin= require('../models/admin.js');

mongoose.connect('mongodb://localhost/news');
let salt, hash, password;
let username = 'admin1';
password = 'admin';
salt = bcrypt.genSaltSync(10);
hash = bcrypt.hashSync(password, salt);
let AdminUser = new Admin({
    username: username,
    password: hash
});
AdminUser.save(function(err) {
    if (!err) {
        console.log('Admin User successfully created');

    } else {
        console.log('fail');
    }
});

