var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.get('/:id', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {

            return next(err);
        }
        data = JSON.parse(data);
        getOneProduct(data, req, res);
    });
});

function getOneProduct(data, req, res) {
    for (var i = 0; i < data.length; i++) {
        if ((data[i].id) === parseInt(req.params.id)) {
            res.status(200).json(data[i]);

            return;
        }
    }
    res.sendStatus(404);
}

module.exports = router;