const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const message = sequelize.define("message", {
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  message_type: {
    type: DataTypes.ENUM("text", "image", "file"),
    defaultValue: "text",
  },
  is_read:{
    type: DataTypes.BOOLEAN,
    defaultValue:false,
  }
});

message.associate = (models) => {
    message.belongsTo(models.Chat, {foreignKey: "chat_id"});
    message.belongsTo(models.User, {foreignKey: "sender_id"});
};

module.exports = message;
