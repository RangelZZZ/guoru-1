var express = require('express');
var router = express.Router();
var fs = require('fs');
var productsFile = './products.json';

router.put('/:id', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, data) {
        if (err) {

            return next(err);
        }
        data = JSON.parse(data);
        updataProduct(data, req, res, next);
    });
});

function updataProduct(data, req, res, next) {
    var product = req.body;

    if (isExist(product) && isRight(product)) {
        getNewProduct(data, product, req, res, next);
    }
    else {
        res.sendStatus(400);
    }
}

function getNewProduct(data, product, req, res, next) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(req.params.id)) {

            data[i].barcode = product.barcode;
            data[i].name = product.name;
            data[i].unit = product.unit;
            data[i].price = product.price;

            res.status(201).json(data[i]);
            writeFile(data, next);

            return;
        }
    }
    res.sendStatus(404);
}

function isExist(product) {

    return product.hasOwnProperty("barcode") &&
        product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") &&
        product.hasOwnProperty("price");
}

function isRight(product) {

    return typeof(product.barcode) === 'string' &&
        typeof(product.name) === "string" &&
        typeof(product.unit) === "string" &&
        typeof(product.price) === "number";
}

function writeFile(data, next) {
    fs.writeFile(productsFile, JSON.stringify(data), function (err) {
        if (err) {
            return next(err);
        }
    });
}

module.exports = router;
