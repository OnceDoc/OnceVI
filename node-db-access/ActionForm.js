    //insert new info in the form
    app.get('/insert', function(req, res) {
        res.render('InsertExample.html')
    })

    // Connect to the MS Access DB
    app.post('/insert/userinfo', function(req, res) {
    var data=req.body
    // Query the DB
    var stringname = 'INSERT INTO [UserInfo] (Username, Passwd,Email, Telephone) Values ("' + data.username + '","' + data.password + '","' + data.email +'", " ' + data.telephone +'")'
    // console.log(stringname)
      connection
        .execute(stringname) 
        .on('done', function (data){
            res.redirect('/dataquery/All')
         })
        .on('fail',function(data){
            console.log('Insert Failure')
        })
    })

    //delete info in the form
    app.get('/delete', function(req, res) {
        res.render('DeleteExample.html')
    })

    app.post('delete/userinfo',function(req,res){
        var data=req.body
        connection
        .execute('Delete From UserInfo where Username = "' + data.username +'" ')
        .on('done', function (data){
            res.redirect('/dataquery/All')
         })
        .on('fail',function(data){
            console.log('Delete Failure')
        })
    })


    //update info in the form
    app.get('/update', function(req, res) {
        res.render('UpdateExample.html')
    })

    app.post('update/userinfo',function(req,res){
        var data=req.body
        var stringname = ' Update UserInfo Set Passwd=" '+ data.password +' " where Username ="'+ data.username +'" '
        connection
        .execute(stringname)
        .on('done', function (e){
            res.redirect('/dataquery/Username/'+ data.username)
            console.log(stringname)
         })
        .on('fail',function(e){
            console.log('Update Failure', e)
        })
    })

