    var OnceIO = require('onceio')
    var app    = OnceIO()

    var ADODB = require('node-adodb');
    ADODB.debug = true;

    // Connect to the MS Access DB
    var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=QueryChart.accdb;Persist Security Info=False;');


    /*
    Execute Method (ADO Connection)
    https://msdn.microsoft.com/en-us/library/windows/desktop/ms675023.aspx

    Connection Object (ADO)
    https://msdn.microsoft.com/en-us/library/windows/desktop/ms681519.aspx
    */
    app.get('/dataquery/Username/:name', function(req, res) {
      // Query the DB
      connection
      .query('SELECT * FROM [UserInfo] where  Username like "%' + req.params.name + '%"')
      .on('done', function (data){
          res.type('json')
          res.send(JSON.stringify(data.records, '    ', '    '))
      })
      .on('fail', function() {
          res.send({ error: 'The info if not found' })
      })
    })


    app.get('/dataquery/All', function(req, res) {
      // Query the DB
      connection
      .query('SELECT top 100 * FROM [UserInfo]')
      .on('done', function (data){
          res.type('json')
          res.send(JSON.stringify(data.records, '    ', '    '))        
      })
      .on('fail', function() {
          res.send({ error: 'The info if not found' })
      })
    })


    global.app = app
    global.connection = connection
    require('./ActionForm.js')