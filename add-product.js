var express = require('express');
var router = express.Router();
var fs = require("fs");
var maxIdFile = './max-id.json';
var productsFile = './products.json';

router.post('/', function (req, res) {
    fs.readFile(productsFile, 'utf-8', function (err, fileContent) {
        if (err) {
            console.error(err.stack());
            res.sendStatus(500);

            return;
        }
        var productsData = JSON.parse(fileContent);

        getInputProduct(productsData, req, res);
    });
});

function getInputProduct(productsData, req, res) {
    var product = req.body;

    if (isExist(product) && isRight(product)) {
        addProduct(productsData, product, res);
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

function addProduct(productsData, product, res) {
    fs.readFile(maxIdFile, 'utf-8', function (err, productsId) {
        if (err) {
            res.sendStatus(500);

            return;
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

        writeAllProductsData(productsId, productsData, res);
    });
}

function writeAllProductsData(productsId, productsData, res) {
    fs.writeFile(maxIdFile, JSON.stringify(productsId), function (err) {
        if (err) {
            console.error(err.stack());
            res.sendStatus(500);
        }
    });

    fs.writeFile(productsFile, JSON.stringify(productsData), function (err) {
        if (err) {
            console.error(err.stack());
            res.sendStatus(500);
        }
    });
}

module.exports = router;