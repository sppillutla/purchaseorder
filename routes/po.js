

var pool      =    require('./ConnectionPool');



exports.get = function(poId,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          // connection.release();
         return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "select * from po";

        if (poId) {
          sqlQuery = sqlQuery + " where ponumber='" + poId + "'";
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

exports.put = function(poId,po,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Update po set podate = ?, vendor = ? " +
        " where ponumber = ?";
        var sqlValues = [po["podate"], po["vendor"],poId];
        
        console.log("Trying to update product with query " + sqlQuery);
        console.log("Values supplied are " + JSON.stringify(po));
        
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

exports.post = function(po,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Insert into po set ?";
        
        console.log("Trying to insert into product with query " + sqlQuery);
        console.log("Values supplied are " + JSON.stringify(po));
        
        connection.query(sqlQuery,po,function(err,rows){
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

exports.del = function(poId,callback) {
    
    pool.pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          return callback({"code" : 100, "status" : "Error in connection database"},null);
        }   

        console.log('connected as id ' + connection.threadId);

        var sqlQuery = "Delete from po where ponumber = ?";
        
        var sqlValues = [poId];
        
        console.log("Trying to delete from product with query " + sqlQuery);
        console.log("Values supplied are " + poId);
        
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
