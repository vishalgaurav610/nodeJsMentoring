import UserModal from "../models/UserModels.js";
import { Op } from "sequelize";

const retrieveUserDetails = async () => {
    const users = await UserModal.findAll();
    return users;
}

const retrieveUserDetailById = async (userId) => {
    let user = await UserModal.findByPk(userId);
    return user;
}

const addNewUser = async (userDetail) => {
    const user = await UserModal.create(userDetail);
    console.log("Added user:", JSON.stringify(user, null, 2));
}

const updateUser = async (userDetail) => {
    let user = await UserModal.findByPk(userDetail.id);
    user.login = userDetail.login;
    user.password = userDetail.password;
    await user.save();
    return user;
}

const deleteUser = async (userId) => {
    let user = await UserModal.findByPk(userId);
    user.isDeleted = true;
    await user.save();
    return user;
}

const filterUser = async (loginString, count) => {
    let users = await UserModal.findAll({   
        where: {
            login: {
              [Op.substring]: loginString
            }
        },
        limit: count
    });

    return users;
}

export { retrieveUserDetails, retrieveUserDetailById, addNewUser, updateUser, deleteUser, filterUser }