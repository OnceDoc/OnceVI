var OnceIO = require('onceio')
var app    = OnceIO()

var ADODB = require('node-adodb');
ADODB.debug = true;

// Connect to the MS Access DB
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=QueryChart.accdb;Persist Security Info=False;');

 

	app.get('/dataquery/Username/:name', function(req, res) {
	// Query the DB
	connection
	    .query('SELECT * FROM [UserInfo] where  Username like "%' + req.params.name + '%"')
	    .on('done', function (data){
	    	res.type('json')
	        res.send(JSON.stringify(data.records, '    ', '    '))
	    })
	    .on('error', function() {
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
	    .on('error', function() {
	        res.send({ error: 'The info if not found' })
	    })
	})