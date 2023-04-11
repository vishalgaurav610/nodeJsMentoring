import UserModal from "../models/UserModels.js";
import { Op } from "sequelize";
import appLogger from "../utils/appLogger.js";

const retrieveUserDetails = async () => {
    try {
        const users = await UserModal.findAll();
        return users;
    } catch (err) {
        appLogger.error(err.message);
    }
}

const retrieveUserDetailById = async (userId) => {
    let user = await UserModal.findByPk(userId);
    return user;
}

const addNewUser = async (userDetail) => {
    // UserModal.findOrCreate({
    //     where: {login: userDetail.login},
    //     defaults: userDetail
    //  }).then((userRow, isCreated) => {
    //     if(isCreated){
    //         return "user Created"
    //     } else {
    //         return "user Exist"
    //     }
    //  }).catch((err) => {
    //     appLogger.error(err.message);
    //  })
    let user = await UserModal.findOne({ where: { login: userDetail.login } });
    if (user) {
        return "user already Exist"
    }
    try {
        const userAdd = await UserModal.create(userDetail);
        return userAdd;
    } catch (err) {
        appLogger.error(err.message);
    }
}

const updateUser = async (userDetail) => {
    let user = await UserModal.findByPk(userDetail.id);
    user = {...userDetail}
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

const sum = function (a, b) {
    return a + b;
}

export {
    retrieveUserDetails,
    retrieveUserDetailById,
    addNewUser, updateUser, deleteUser, filterUser,
    sum
}