// set up 
	var express 	= require('express');	                                        //import express
	var app 		= express();			                                        //create our app with express
	var mongoose 	= require('mongoose');	                                        //import mongoose for mongodb

// configuration
	mongoose.connect('mongodb://nelk:password@novus.modulusmongo.net:27017/Nu6wumyn');
	                                                                                //^ connect to mongodb DB in modulus.io

	app.configure(function(){                                                       // ** Customizing our Express app **
        app.use(express.static(__dirname + '/public'));
                                                                                    //setting the static files location.
                                                                                    //eg: /public/img will be /img for users
        app.use(express.logger('dev'));                                             //log every request to the console
        app.use(express.bodyParser());                                              //pull info from html in POST
    });

    // model
    var Todo = mongoose.model('Todo', { text : String });

// routes
    //api
    app.get('/api/todos', function(req,res){                                        //get all todos
        Todo.find(function(err, todos) {                                            //get all todos in db with mongoose
            if(err)                                                                 //if there is an error retrieving, send the error.
                res.send(err)
            res.json(todos);
        });
    });

    app.post('/api/todos', function(req, res) {                                     //create to-do and send back all todos after creation
        Todo.create({ text: req.body.text, done: false }, function(err, todo) {     //create a to-do, info coming from AJAX (Angular)
            if(err)
                res.send(err)
            Todo.find(function(err,todos){                                          //get and return all todos after you create another
                if(err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.delete('/api/todos/:todo_id', function(req, res){                           //delete a to-do
        Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
            if(err)
                res.send(err);
            Todo.find(function(err,todos){                                          //get and return all todos after you create another
                if(err)
                    res.send(err)
                res.json(todos);
            });
        });
    });


//application
    app.get('*', function(req, res){
        res.sendfile('./public/index.html');                                        //load the single view file (angular will handle page changes on front-end)
    });












// listen (start app with node server.js)
    app.listen(8080);
    console.log('App listening on port 8080');

