import UserGroupModel from "../models/UserGroupModel.js";

const Group = require("../models/GroupsModel.js");
const User = require("../models/UserModels.js");

const sequelize = new Sequelize("postgres://uvkkoqgu:0Lw_qf4bFniaJtfAf-SBj_Vm2PaujPAP@isilo.db.elephantsql.com/uvkkoqgu");
const Sequelize = require("sequelize");

const addUsersToGroup = async (groupId, userIds) => {
  const transactionInstance = await sequelize.transaction();

  try {
    const inOp = Sequelize.Op.in;
    const currentGroup = await Group.findOne({ where: { id: groupId } });

    if (currentGroup) {
      const usersList = await User.findAll({
        where: { id: { [inOp]: userIds } },
      });
      if (usersList.length > 0) {
        await currentGroup.addUsers(usersList, {
          transaction: transactionInstance,
        });
        await transactionInstance.commit();
        return currentGroup;
      } else {
        await transactionInstance.rollback();
        throw new Error("Users not found");
      }
    } else {
      await transactionInstance.rollback();
      throw new Error("Group not found");
    }
  } catch (err) {
    console.log(err);
    await transactionInstance.rollback();
  }
};

export { addUsersToGroup }
