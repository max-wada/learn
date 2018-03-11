const fs = require('fs')
const assert = require('assert')
const User = require('./db').User

fs.readFile('data/users.json', (err, data) => {
    assert.equal(err, null)
    JSON.parse(data).forEach((userValues) => {
        let user = new User(userValues)
        user.save()
        console.log('user saved.', user.id)
    })
})