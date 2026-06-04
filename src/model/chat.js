const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Chat = sequelize.define(
    'Chat', {
        user1_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        user2_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    }
);

Chat.associate = (models) => {
    Chat.belongsTo(models.User, {as: "User1", foreignKey:"user1_id"});
    Chat.belongsTo(models.User, {as: "User2", foreignKey:"user2_id"});
    Chat.hasMany(models.Message, { foreignKey: "chat_id" });
};

module.exports = Chat;