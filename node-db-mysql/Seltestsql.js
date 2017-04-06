    var OnceIO = require('onceio')
    var app    = OnceIO()

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'wang1234567',
      database : 'helloworld'
    });

    connection.connect();

    app.get('/dataquery/Username/:name', function(req, res) {
      connection
        .query ('Select * from testsql where Username like "%' + req.params.name + '%" ', function(err,results,fields){
           if (err){
            console.log('[select]'+err);
            return;
           }
           res.type('json')
           res.send(JSON.stringify(results, '    ', '    '))
        })
    })

    app.get('/dataquery/All', function(req, res) {
      connection
        .query ('Select * from testsql ', function(err,results,fields){
           if (err){
            console.log('[select]'+err);
            return;
           }
           res.type('json')
           res.send(JSON.stringify(results, '    ', '    '))
        })
    })

    


