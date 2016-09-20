var router = require('express').Router(),
    userModel = require('../models/users.js'),
    tool = require('../tool.js');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send(userModel);
    });

router.route('/count/:sex')
    .get(function(req, res, next) {
        var sex = req.params.sex;
        var users = tool.match(userModel, function(test) {
            return test.sex === sex.toLowerCase();
        })
        console.log(users);
        //res.status(200).send('count:' + users.length);
        res.status(200).send('' + users.length);
    });

router.route('/ageAvg')
    .get(function(req, res, next) {
        var ageSum = 0;
        for (var i = 0, l = userModel.length; i < l; i++) {
            ageSum += parseInt(userModel[i].age);
        }
        res.send('age avg:' + (ageSum / userModel.length));
    });

router.route('/search')
    .get(function(req, res, next) {
        var com = req.query.company;
        var users = tool.match(userModel, function(test) {
            return test.company.toLowerCase().search(com.toLowerCase()) !== -1;
        });
        if (users.length) {
            res.send(users);
        } else {
            res.status(404).send('not found.');
        }
    });

router.route('/:id')
    .get(function(req, res, next) {
        var index = req.params.id;
        var user = userModel[index];
        if (user) {
            res.status(200).send([user.firstName, user.lastName].join(' '));
        } else {
            res.status(404).send('not found.');
        }
    })
    .put(function(req, res, next) {
        var index = req.params.id;
        var age = parseInt(req.body.age);
        var user = userModel[index];
        if (user) {
            if (isNaN(age)) {
                res.status(400).send('Age need Number.');
            } else {
                user.age = age;
                res.status(200).send(user);
            }
        } else {
            res.status(404).send('not found.');
        }
    });

module.exports = router;
