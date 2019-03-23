var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : ,
    password : ,
    port: ,
    database: 'chpn'
});

connection.connect(err => {
    if(err) throw err;
    console.log('mysql connncted success!');
});

var sql = 'SELECT * FROM ';
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();