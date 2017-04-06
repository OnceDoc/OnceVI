var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wang1234567',
  database : 'helloworld'
});

connection.connect();

// insert sentence
/*
connection.query('Insert into new_table (ID, Age) values (26,23)', function (error, results) {
  if (error) {
  console.log("absdefg",error)}
  console.log("derfa:",results)
});
*/




/*
connection.query (' Select 2 as solution', function(err, results,fields){
    if (err){
        console.log('[select]'+err);
    return;
    }
    console.log('the solutions is :',results[0].solution)
})

*/

/*
connection.query('Update new_table Set Age= 100 where id=3',function(err,result){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('update affect rows',result.affectedRows);
})
*/

/*
connection.query('delete from  testsql where Passwd = "Passwd" ',function(err,result){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('delete affectedrows',result.affectedRows);
})
*/
 

connection.query (' Select * from testsql ', function(err, results,fields){
    if (err){
        console.log('[select]'+err);
    return;
    }
    console.log('the result is :',results)
})

connection.end();