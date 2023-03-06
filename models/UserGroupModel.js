import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://uvkkoqgu:0Lw_qf4bFniaJtfAf-SBj_Vm2PaujPAP@isilo.db.elephantsql.com/uvkkoqgu");

import GroupModel from "./GroupsModel.js";
import UserModel from "./UserModels.js";

const UserGroupModel = sequelize.define('UserGroup', {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: UserModel,
      key: 'id'
    }
  },
  groupId: {
    type: DataTypes.UUID,
    references: {
      model: GroupModel, 
      key: 'id'
    }
  }
});

GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
UserModel.belongsToMany(GroupModel, { through: UserGroupModel });

export default UserGroupModel;