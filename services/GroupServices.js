import GroupModel from "../models/GroupsModel.js";

const getAllGroups = async () => {
    const groups = await GroupModel.findAll();
    return groups;
}

const getGroupDetailById = async (groupId) => {
    let group = await GroupModel.findByPk(groupId);
    return group;
}

const addNewGroup = async (groupDetails) => {
    const group = await GroupModel.create(groupDetails);
    console.log("Added group:", JSON.stringify(group, null, 2));
}

const updateGroup = async (groupDetail) => {
    let group = await GroupModel.findByPk(groupDetail.id);
    group.name = groupDetail.name;
    group.permissions = groupDetail.permissions;
    await group.save();
    return group;
}

const deleteGroup = async (groupId) => {
    let group = await GroupModel.destroy({
        where: {
            id: groupId
        }
      });
    return group;
}

export { getAllGroups, getGroupDetailById, addNewGroup, updateGroup, deleteGroup }