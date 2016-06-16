var express = require('express');
var app = express();
var products = require('./products.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var maxIdUtils = require('./max-id-utils.js');
maxIdUtils.initMaxIdFile();

app.use('/products', require('./getOneProduct.js'));
app.use('/products', require('./getAllProducts.js'));
app.use('/products', require('./addProduct.js'));
app.use('/products', require('./deleteProduct.js'));
app.use('/products', require('./updataProducts.js'));

app.listen(8010, function () {
    console.log('server start');
});
