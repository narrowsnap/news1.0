const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('./../models/admin');
const News = require('./../models/news');
const bcrypt = require('bcrypt-nodejs');
const multiparty = require('connect-multiparty');
const fs = require('fs');
const path = require('path');
const session = require('express-session');



/* GET home page. */
router.get('/', function(req, res, next) {
});

router.get('/news/count', function (req, res) {
    News.count(function (err, data) {
        if(err) {
            console.log(err);
            res.json({status: 404, message: '获取新闻数据失败'});
        } else {
            res.json({status: 200, count: data});
        }

    });
});
router.get('/news/:currentPage', function (req, res, next) {
    News.find(function (err, data) {
        if(err) {
            console.log('加载第一页失败', err);
            res.json({status: 404, message: '加载第一页失败'});
        } else {
            res.json({status: 200, message: '加载第一页成功', data: data});
        }
    }).skip(parseInt(req.params.currentPage)-1).limit(10).sort({create_time: -1});
})

router.post('/news/delete', function (req, res) {
    if(!req.session.adminId){
        News.remove({_id: req.body.data._id}, function (err, data) {
            if(err) {
                console.log('删除数据失败', err);
                res.json({status: 404, message: '删除数据失败'});
            } else {
                console.log('删除数据成功');
                res.json({status: 200, message: '删除数据成功', item: data});
            }
        })
    } else {
        res.json({status: 401, message: '认证失效'});
    }

})

router.post('/login', function (req, res, next) {
    const username = req.body.username || '';
    const password = req.body.password || '';
    Admin.findOne({
        username: username
    }, (err, admin) => {
        if(err) {
            throw err;
        }
        if(!admin) {
            res.json({status: 404, message: '用户不存在'});
        } else {
            if(bcrypt.compareSync(password, admin.password)) {
                req.session.adminId = admin._id;
                res.json({status: 200, message: '验证成功'});
            } else {
                res.send({status: 404, message: '认证失败,密码错误!'});
            }
        }
    })
});

router.post('/uploadImg', multiparty(), function (req, res, next) {
    if(!req.session.adminId) {
        fs.readFile(req.files.file.path, function (err,data) {
            if(err) {
                console.log('err: ' + err);
                res.json({status: 404, msg: '图片上传失败'});
            }
            let targetPath = path.resolve(__dirname, '..') + '/app/img/' + req.body.img_name + '.' + req.files.file.name.split('.')[1];
            // console.log('data: ' + targetPath);
            fs.writeFile(targetPath, data, function (err) {
                if(err) {
                    console.log(err);
                    res.json({status: 404, msg: '图片上传失败'});
                } else {
                    res.json({status: 200, msg: '图片上传成功', img_type: req.files.file.name.split('.')[1]});
                }
            })
        });
    } else {
        res.json({status: 401, message: '认证失效'});
    }
});

router.post('/form', function (req, res, next) {
    if(!req.session.adminId) {
        let img_url = '/img/' + req.body.data.title + '.' + req.body.data.img_type;
        console.log('url: ' + img_url);
        let news = new News({
            title: req.body.data.title,
            tag: req.body.data.tag,
            img_url: img_url,
            content: req.body.data.content,
            create_user: req.body.data.create_user,
            create_time: Date.now()
        });
        // console.log('form: ' + JSON.stringify(news));
        news.save(function (err) {
            if(!err) {
                console.log('create news successful');
                res.json({status: 200, message: 'ok'});
            } else {
                res.json({status: 404, message: 'fail'});
                console.log('err: ' + err);
            }
        })
    } else {
        res.json({status: 401, message: '认证失效'});
    }

})


module.exports = router;

