import express from 'express';
import Joi from 'joi';
import isAuth from '../middleware/is-auth.js';

import { addUsersToGroup } from '../services/UserGroupServices.js';

const userGroupSchema = Joi.object({
    userId: Joi.string().required(),
    groupId: Joi.array().required()
})

const router = express.Router();

router.get('/addUsersToGroup', isAuth, async (req, res) => {
    const allGroups = await addUsersToGroup();
    res.status(200).json(
        {
            message: 'groups list',
            groups: allGroups
        }
    )
})

export default router;