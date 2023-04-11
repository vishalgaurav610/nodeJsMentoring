import { Sequelize, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize("postgres://uvkkoqgu:0Lw_qf4bFniaJtfAf-SBj_Vm2PaujPAP@isilo.db.elephantsql.com/uvkkoqgu");

const groupModel = sequelize.define("groups", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

(async () => {
    await sequelize.sync({ });
    // Code here
})();

export default groupModel;

