const express = require('express')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const Users = [];

const server = express()
    .use(bodyParser.json())
    
server.listen(PORT, () => console.log('Server started'));

server.get('/users', (req, res) => {
    res.status(200).json(
        {
            message: 'users list',
            users: Users
        }
    )
})

// get user by ID
server.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    var message = "User does not exist";
    var userDetails = {};
    Users.forEach((item) => {
        if (item.id == userId) {
            userDetails = item;
            message = "User details";
            return;
        }
    })
    
    res.status(200).json(
        {
            message: message,
            user: userDetails
        }
    )
})

// add new user
server.post('/addNewUser', (req, res) => {
    const newUser = req.body.user;
    let message = "User already exist";
    var userExist = false;
    Users.forEach((item) => {
        if (item.id == newUser.id) {
            userExist = true;
            return;
        }
    })
    if (!userExist) {
        Users.push(newUser);
        message = 'user added';
    }
    
    res.status(200).json(
        {
            message: message,
            user: newUser
        }
    )
})

// update user
server.put('/updateUser', (req, res) => {
    const newUser = req.body.user;
    let message = "User does not exist";
    Users.forEach((item, index) => {
        if (item.id == newUser.id) {
            Users[index] = newUser;
            message = 'user updated';
            return;
        }
    })
    
    res.status(200).json(
        {
            message: message,
            user: newUser
        }
    )
})

// delete user
server.put('/deleteUser', (req, res) => {
    let newUser = req.body.user;
    let message = "User does not exist";
    Users.forEach((item, index) => {
        if (item.id == newUser.id) {
            Users[index].isDeleted = true;
            newUser = Users[index];
            message = 'user deleted';
            return;
        }
    })
    
    res.status(200).json(
        {
            message: message,
            user: newUser
        }
    )
})

//Auto suggestion
server.get('/user/:loginSubstring/:limit', (req, res) => {
    const loginSubstring = req.params.loginSubstring;
    const limit = req.params.limit;
    var suggestUsers = [];
    Users.forEach((item) => {
        if (suggestUsers.length == limit) {
            return;
        }
        if (item.login == loginSubstring) {
            suggestUsers.push(item)
        }
    })
    
    res.status(200).json(
        {
            message: 'User list',
            user: suggestUsers
        }
    )
})