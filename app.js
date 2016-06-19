var express = require('express');
var app = express();
var products = require('./products.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var maxIdUtils = require('./max-id-utils.js');
maxIdUtils.initMaxIdFile();

app.use('/products', require('./get-one-product.js'));
app.use('/products', require('./get-all-products.js'));
app.use('/products', require('./add-product.js'));
app.use('/products', require('./delete-product.js'));
app.use('/products', require('./updata-products.js'));

app.use(function (err, req, res, next) {
    console.dir(err);
    res.status(500).send('Custom error handler');
});

app.listen(8010, function () {
    console.log('server start');
});
