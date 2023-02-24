import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

// const UserServices = require('./services/UserServices.js');
import { addNewUser, deleteUser, filterUser, retrieveUserDetailById, retrieveUserDetails, updateUser } from './services/UserServices.js';

const PORT = process.env.PORT || 3001;

const userSchema = Joi.object({
    // id: Joi.string().required(),
    age: Joi.number().required().min(4).max(130),
    isDeleted: Joi.boolean().required(),
    password: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$')),
    login: Joi.string().required()
})

const server = express()
    .use(bodyParser.json())
    
server.listen(PORT, () => console.log('Server started'));

server.get('/users', async (req, res) => {
    const usersDB = await retrieveUserDetails();
    res.status(200).json(
        {
            message: 'users list',
            users: usersDB
        }
    )
})

// get user by ID
server.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const userDetail = await retrieveUserDetailById(userId);
    if (userDetail) {
        message = "User details"; 
    }
    res.status(200).json(
        {
            message: message,
            user: userDetail
        }
    )
})

// add new user
server.post('/addNewUser',
  async (req, res, next) => {
    const newUser = req.body.user;
    let message = "User already exist";

    const { error, value } = userSchema.validate(req.body.user, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json(
            {
                "Invalid Request: " : JSON.stringify(error)
            }
        );
    } else {
        const addUser = await addNewUser(newUser);
        res.status(200).json(
            {
                message: message,
                user: addUser
            }
        )
    }
});

// update user
server.put('/updateUser',async (req, res) => {
    const newUser = req.body.user;
    let message = "User does not exist";

    const updatedUserDetail = await updateUser(newUser);
    if (updatedUserDetail) {
        message = 'user updated';
    }
    res.status(200).json(
        {
            message: message,
            user: updatedUserDetail
        }
    )
})

// delete user
server.put('/deleteUser/:id',async (req, res) => {
    let newUser = req.params.id;
    let message = "User does not exist";

    const deletedUserDetails = await deleteUser(newUser);
    if (deletedUserDetails) {
        message = 'user deleted';
    }
    
    res.status(200).json(
        {
            message: message,
            user: newUser
        }
    )
})

//Auto suggestion
server.get('/user/:loginSubstring/:limit',async (req, res) => {
    const loginSubstring = req.params.loginSubstring;
    const limit = req.params.limit;
    
    const suggestUsers = await filterUser(loginSubstring, limit);
    res.status(200).json(
        {
            message: 'User list',
            user: suggestUsers
        }
    )
})