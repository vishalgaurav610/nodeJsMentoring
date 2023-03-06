import express from 'express';
import Joi from 'joi';
import isAuth from '../middleware/is-auth.js';

import { addNewGroup, deleteGroup, getAllGroups, getGroupDetailById, updateGroup } from '../services/GroupServices.js';

const groupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required()
})

const router = express.Router();

router.get('/getAllGroups', isAuth, async (req, res) => {
    const allGroups = await getAllGroups();
    res.status(200).json(
        {
            message: 'groups list',
            groups: allGroups
        }
    )
})

// get group by ID
router.get('/:id', isAuth, async (req, res) => {
    const groupId = req.params.id;
    let message = "Group not found";
    const groupDetail = await getGroupDetailById(groupId);
    if (groupDetail) {
        message = "Group details"; 
    }
    res.status(200).json(
        {
            message: message,
            group: groupDetail
        }
    )
})

// add new group
router.post('/addNewGroup', isAuth,
  async (req, res, next) => {
    const newGroup = req.body.group;
    let message = "Group already exist";

    const { error, value } = groupSchema.validate(req.body.group, {
        abortEarly: false,
    });
    if (error) {
        return res.status(400).json(
            {
                "Invalid Request: " : JSON.stringify(error)
            }
        );
    } else {
        const addGroup = await addNewGroup(newGroup);
        res.status(200).json(
            {
                message: message,
                group: addGroup
            }
        )
    }
});

// update group
router.put('/updateGroup', isAuth, async (req, res) => {
    const newGroup = req.body.group;
    let message = "Group does not exist";

    const updatedGroupDetail = await updateGroup(newGroup);
    if (updatedGroupDetail) {
        message = 'group updated';
    }
    res.status(200).json(
        {
            message: message,
            group: updatedGroupDetail
        }
    )
})

// delete group
router.put('/deleteGroup/:id', isAuth, async (req, res) => {
    let groupId = req.params.id;
    let message = "Group does not exist";

    const deletedGroupDetails = await deleteGroup(groupId);
    if (deletedGroupDetails) {
        message = 'group deleted';
    }
    
    res.status(200).json(
        {
            message: message,
            group: deletedGroupDetails
        }
    )
})



export default router;