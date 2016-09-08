var router = require('express').Router();

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send({
            msg: 'api is ok.'
        })
    });

module.exports = router;
