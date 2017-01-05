
var pool      =    require('./ConnectionPool');



exports.get = function(productId,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          // connection.release();
         return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "select * from product";

        if (productId) {
          sqlQuery = sqlQuery + " where productid='" + productId + "'";
        }

        console.log("Trying to get product with query " + sqlQuery);
        
        connection.query(sqlQuery,function(err,rows){
            connection.release();
            if(!err) {
                return callback(null,rows);
            }           
        });

        connection.on('error', function(err) {      
              return callback({"code" : 100, "status" : "Error in connection database"},null);
                
        });
  });
}

exports.put = function(productId,product,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Update product set productname = ?, productprice = ? " +
        " where productid = ?";
        var sqlValues = [product["productname"], product["productprice"],productId];
        
        console.log("Trying to update product with query " + sqlQuery);
        console.log("Values supplied are " + JSON.stringify(product));
        
        connection.query(sqlQuery, sqlValues, function(err,rows){
            connection.release();
            if(!err) {
                return callback(null,rows);
            }           
        });

        connection.on('error', function(err) {      
              return callback({"code" : 100, "status" : "Error in connection database"},null);
                
        });
  });
}

exports.post = function(product,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Insert into product set ?";
        
        console.log("Trying to insert into product with query " + sqlQuery);
        console.log("Values supplied are " + JSON.stringify(product));
        
        connection.query(sqlQuery,product,function(err,rows){
            connection.release();
            if(!err) {
                return callback(null,rows);
            }           
        });

        connection.on('error', function(err) {      
              return callback({"code" : 100, "status" : "Error in connection database"},null);
                
        });
  });
}

exports.del = function(productId,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Delete from product where productid = ?";
        
        var sqlValues = [productId];
        
        console.log("Trying to delete from product with query " + sqlQuery);
        console.log("Values supplied are " + productId);
        
        connection.query(sqlQuery, sqlValues, function(err,rows){
            connection.release();
            if(!err) {
                return callback(null,rows);
            }           
        });

        connection.on('error', function(err) {      
              return callback({"code" : 100, "status" : "Error in connection database"},null);
                
        });
  });
}
