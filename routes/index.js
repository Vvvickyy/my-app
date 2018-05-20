var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var TodoModel = mongoose.model('Todo');

router.get('/', function(req, res, next) {
    TodoModel.find().sort('updated_at').exec(function(err, todos, count) {
        res.render('index', { 
            title: 'Todo List',
            todos: todos
        });
    });
});

router.post('/create', function(req, res) {
    console.log('req.body', req.body);
    new TodoModel({ 
        content: req.body.content,
        updated_at: Date.now()
    }).save(function(err, todo, count) { 
        console.log('content', todo, 'count', count); 
        res.redirect('/'); 
    });
});

router.get('/destroy/:id', function(req, res) {
    TodoModel.findById(req.params.id, function(err, todo) {
        todo.remove(function(err, todo) {
            res.redirect('/');
        });
    });
});

router.get('/edit/:id', function(req, res) {
    TodoModel.
    find().
    sort('updated_at').
    exec(function(err, todos, count) {
        res.render('edit', { 
            title: 'Todo List',
            todos: todos,
            current: req.params.id
        });
    });
});

router.post('/update/:id', function(req, res) {
    TodoModel.findById(req.params.id, function(err, todo) {
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count) {
            res.redirect('/');
        });
    });
});

module.exports = router;


