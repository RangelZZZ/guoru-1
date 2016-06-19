var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.get('/', function (req, res, next) {

    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {

            return next(err);
        }
        data = JSON.parse(data);
        res.status(200).json(data);
    });
});

module.exports = router;
