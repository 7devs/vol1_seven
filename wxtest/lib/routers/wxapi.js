var router = require('express').Router(),
    xmlParser = require('express-xml-bodyparser'),
    xml = require('xml');

// list of best
router.route('/')
    .post(xmlParser({
        explicitArray: false
    }), function(req, res, next) {
        var data = req.body.xml;
        console.log(data);
        res.append('Content-Type', 'text/xml');
        res.send(xml({
            xml: [
                {ToUserName: {_cdata: data.FromUserName}},
                {FromUserName: {_cdata: data.ToUserName}},
                {CreateTime: +new Date()},
                {MsgType: {_cdata: 'text'}},
                {Content: {_cdata: 'lalala...'}}
            ]
        }));
    })
    .get(function(req, res, next) {
        res.status(200).send(req.query.echostr);
    });

module.exports = router;
