/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , po = require('./routes/po')
  , product = require('./routes/product')
  , methodOverride = require('method-override');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(express.bodyParser());
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

//app.get('/', routes.index);

app.get('/purchaseorder',function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.sendfile(__dirname + '/public/purchaseorder.html');
        });

app.get('/purchaseorder/api/v1/po',function(req, res) {
            // list all charge
            po.get(null,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.get('/purchaseorder/api/v1/product',function(req, res) {
            // list all charge
            product.get(null,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.post('/purchaseorder/api/v1/po', function(req, res) {
            // insert one charge
                po.post(req.body,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.post('/purchaseorder/api/v1/product', function(req, res) {
            // insert one charge
                product.post(req.body,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });


app.put('/purchaseorder/api/v1/po/:id', function(req, res) {
            // edit charge
             po.put(req.param('id'),req.body,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.put('/purchaseorder/api/v1/product/:id', function(req, res) {
            // edit charge
             product.put(req.param('id'),req.body,function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.delete('/purchaseorder/api/v1/po/:id', function(req, res) {
            // delete charge
            po.del(req.param('id'),function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });

app.delete('/purchaseorder/api/v1/product/:id', function(req, res) {
            // delete charge
            product.del(req.param('id'),function(error, docs){
                if(error) {
                    res.send(error);
                } else {
                    res.send(docs);
                }
            });
        });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
