module.exports = function(sequelize, DataTypes) {
    const UserAccount = sequelize.define("userAccount", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
      {freezeTableName: true}
);  
  
    return UserAccount;
  };
