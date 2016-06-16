var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.get('/', function (req, res) {

    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);
            res.sendStatus(500);

            return;
        }
        data = JSON.parse(data);
        res.status(200).json(data);
    });
});

module.exports = router;
