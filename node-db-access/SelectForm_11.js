    var OnceIO = require('onceio')
    var app    = OnceIO()

    var ADODB = require('node-adodb');
    ADODB.debug = true;

    // Connect to the MS Access DB
    var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=QueryChart.accdb;Persist Security Info=False;User Id=admin;Password=;');
    
    app.get('/dataquery/All', function(req, res) {
      getfieldname('UserInfo', function(columnname) {
        console.log(columnname[1])
      })
      InsertTable('UserInfo', function(){})
      
    })



    function getfieldname(filename, cb) {
       var ColName=[];
       connection
         .query('SELECT * FROM ['+filename+']')
         .on('done', function (data){
         //res.type('json')
         console.log(data.records)
         var obj = data.records[0]
         
         for (var key in obj) {
            var value    = obj[key]
            var isNumber = typeof val == 'number' 
        console.log("value:",value,"isNumber",isNumber) 
         if (isNumber){
            var Stringname =  key + " INT NOT NULL"
         } 
         else {
            var Stringname = key + " VARCHAR (255) NOT NULL"              
         }
         // console.log(Stringname)
         // return Stringname
         ColName.push(Stringname)
         }
        
        cb && cb(ColName)
        // var reCol=ColName.join()
        //console.log(reCol)
       })
    }
    


     function InsertTable(filename,cb){
       connection
          .query('SELECT * FROM ['+filename+']')
          .on('done', function (data){
            
            for (var i = 0; i < data.records.length; i++) {
            var obj=data.records[i]
            var TestString=[]; 
            var KeyString=[];         
            for (var key in obj){
              TestString.push(obj[key])
              KeyString.push(key)
            }
            var WriteString=[];
            WriteString='Insert into ['+filename+'] ('+KeyString+') Values ( '+TestString+' )'
            .execute(WriteString)
            console.log(WriteString)
            }
            cb && cb(WriteString)
          })
   }
    






