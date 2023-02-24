import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://uvkkoqgu:0Lw_qf4bFniaJtfAf-SBj_Vm2PaujPAP@isilo.db.elephantsql.com/uvkkoqgu");

const userModal = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async () => {
    await sequelize.sync({ });
    // Code here
})();

export default userModal;

