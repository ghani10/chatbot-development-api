const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { type } = require('express/lib/response');


const user = sequelize.define(
    'user', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM("user","admin"),
            defaultValue: "user",
        },
        avatar:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
);

user.associate = (models) => {
    user.hasMany(models.Chat, { foreignKey: "user1_id"});
    user.hasMany(models.Chat, { foreignKey: "user2_id"});
    user.hasMany(models.Message, { foreignKey: "sender_id"});
};



module.exports = user;