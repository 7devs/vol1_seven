var router = require('express').Router()
    newsModel = require('../models/news.js');

router.route('/')
    .get(function(req, res, next) {
        res.send(newsModel);
    });

router.route('/:id')
    .get(function(req, res, next) {
        var index = parseInt(req.params.id) - 1;
        if(index >= 0 && index < newsModel.length) {
            res.send(newsModel[index]);
        } else {
            res.status(404).send('没找到这条新闻。');
        }
    })
    .delete(function(req, res, next){
        var news;
        var index = parseInt(req.params.id) - 1;
        if(index >= 0 && index < newsModel.length) {
            news = newsModel.splice(index, 1);
            console.log(newsModel);
            res.status(200).send(news);
        } else {
            res.status(404).send('没找到这条新闻。');
        }
    });

module.exports = router;
