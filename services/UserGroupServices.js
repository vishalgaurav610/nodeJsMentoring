import UserGroupModel from "../models/UserGroupModel.js";

const addUsersToGroup = async (userGroupData) => {
    const userGroup = await UserGroupModel.create(userGroupData);
    console.log("Added userGroup:", JSON.stringify(userGroup, null, 2));
}

export { addUsersToGroup }