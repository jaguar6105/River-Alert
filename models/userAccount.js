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
      userpassword: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accountStatus: {
        type: DataTypes.STRING,
        allowNull: false
      },
      confirmationCode: {
        type: DataTypes.STRING,
        unique: true,
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
