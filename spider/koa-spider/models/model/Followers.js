const Sequelize = require('sequelize');

const sequelize = require('../../utils/sequelize');

module.exports = sequelize.define('t_followers', {
    id: {
      type: Sequelize.BIGINT(20).UNSIGNED,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    nick: {
      type: Sequelize.STRING(200),
      comment: "昵称"
    },
    nickLink: {
        type: Sequelize.STRING(200),
        comment: "知乎id"
    },
    img: {
        type: Sequelize.STRING(128),
        comment: "图片地址"
    },
    gender: {
        type: Sequelize.STRING(10),
        comment: "性别"
    },
  }, {
    timestamps: true,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  });