    var OnceIO  = require('onceio')
    var app     = OnceIO()

    var db      = require('odbc')();
    /*
    Driver for access
    */
    var connStr = 'Driver={Microsoft Access Driver (*.mdb)};Dbq=QueryChart.accdb;Exclusive=1;Uid=admin;Pwd=;'

    db.openSync(connStr);

    app.get('/dataquery/Username/:name', function(req, res) {
      // Query the DB
      db.query('SELECT * FROM [UserInfo] where  Username like "%' + req.params.name + '%"', function(err, rows, moreResultSets) {
        if (err) {
          res.send({ error: err.toString() })
          return
        }

        console.log(rows, moreResultSets)

        res.type('json')
        res.send(JSON.stringify(rows, '    ', '    '))
      })
    })
