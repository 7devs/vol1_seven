var router = require('express').Router(),
    albumModel = require('../models/albums.js'),
    tool = require('../tool.js');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send(albumModel);
    });

router.route('/singer/:name')
    .get(function(req, res, next) {
        var name = req.params.name;
        var albums = tool.match(albumModel, function(test) {
            return test.singer === name;
        })
        res.status(200).send(albums);
    });

router.route('/longerSong')
    .get(function(req, res, next) {
        var albums = tool.match(albumModel, function(test) {
            return test.length > 180;
        })
        res.status(200).send(albums);
    });

router.route('/search')
    .get(function(req, res, next) {
        var type = req.query.type;
        var albums = tool.match(albumModel, function(test) {
            return test.type.toLowerCase() === type.toLowerCase();
        });
        if (albums.length) {
            res.send(albums);
        } else {
            res.status(404).send('not found.');
        }
    });

router.route('/:id')
    .get(function(req, res, next) {
        var index = req.params.id;
        if (albumModel[index]) {
            res.status(200).send(albumModel[index]);
        } else {
            res.status(404).send('not found.');
        }
    })
    .put(function(req, res, next) {
        var index = req.params.id;
        var length = parseInt(req.body.length);
        var title = req.body.title;
        var album = albumModel[index];
        if (album) {
            album.length = length;
            album.title = title;
            res.status(200).send(album);
        } else {
            res.status(404).send('not found.');
        }
    });

module.exports = router;
