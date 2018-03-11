'use strict';

const express = require('express')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const engines = require('consolidate')
const morgan = require('morgan')
const User = require('./db').User

// App
const app = express();

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/public', express.static('public'))
app.use(morgan('combined'))

app.get('/', (req, res) => {
    User.find((err, users) => {
        if (err) {
            throw err
        }
        res.render('index', {
            greeting: "Hello world!",
            users: users,
        });
    })
});

app.get('/:username', (req, res) => {
    var username = req.params.username
    User.findOne({ username: username }, function(err, user) {
        if (err == null && user != null) {
            res.render('username', {
                user: user
            })
        } else {
            res.send('not found!')
        }
    })
})

app.get('/users/:username', (req, res) => {
    var username = req.params.username
    User.findOne({ username: username }, function(err, user) {
        if (err == null && user != null) {
            res.send(JSON.stringify(user))
        } else {
            res.send('err!')
        }
    })
})

const PORT = 8000
const HOST = '0.0.0.0'
const server = app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});