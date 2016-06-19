var express = require('express');
var router = express.Router();
var fs = require("fs");
var maxIdFile = './max-id.json';
var productsFile = './products.json';

router.post('/', function (req, res, next) {
    fs.readFile(productsFile, 'utf-8', function (err, fileContent) {
        if (err) {

            return next(err);
        }
        var productsData = JSON.parse(fileContent);

        getInputProduct(productsData, req, res, next);
    });
});

function getInputProduct(productsData, req, res, next) {
    var product = req.body;

    if (isExist(product) && isRight(product)) {
        addProduct(productsData, product, res, next);
    }
    else {
        res.sendStatus(400);
    }
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

function addProduct(productsData, product, res, next) {
    fs.readFile(maxIdFile, 'utf-8', function (err, productsId) {
        if (err) {

            return next(err);
        }
        productsId = JSON.parse(productsId);
        productsId.maxId++;

        var item = {
            "id": productsId.maxId,
            "barcode": product.barcode,
            "name": product.name,
            "unit": product.unit,
            "price": product.price
        };

        productsData.push(item);
        res.status(201).json(productsData[productsData.length - 1]);

        writeAllProductsData(productsId, productsData, next);
    });
}

function writeAllProductsData(productsId, productsData, next) {
    fs.writeFile(maxIdFile, JSON.stringify(productsId), function (err) {
        if (err) {
            return next(err);
        }
    });

    fs.writeFile(productsFile, JSON.stringify(productsData), function (err) {
        if (err) {
            return next(err);
        }
    });
}

module.exports = router;