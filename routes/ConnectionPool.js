var mysql     =    require('mysql');

exports.pool     =    mysql.createPool({
    connectionLimit : 100, //important
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 5982,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'po',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'po',
    database : 'purchaseorder',
    debug    :  false
});


