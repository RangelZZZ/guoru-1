var express = require('express');
var router = express.Router();
var fs = require("fs");
var productsFile = './products.json';

router.delete('/:id', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {
            return next(err);
        }
        data = JSON.parse(data);
        deleteProduct(data, req, res, next);
    });
});

function deleteProduct(data, req, res, next) {
    var i = 0;

    for (i; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {
            data.splice(i, 1);
            writeFile(data, res, next);

            return;
        }
    }
    res.sendStatus(404);
}

function writeFile(data, res, next) {
    fs.writeFile(productsFile, JSON.stringify(data), function (err) {
        if (err) {

            return next(err);
        }
        res.sendStatus(200);
    });
}

module.exports = router;