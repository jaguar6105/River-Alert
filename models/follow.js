module.exports = function(sequelize, DataTypes) {
    const Follow = sequelize.define("follow", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      riverId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
      {freezeTableName: true}
);  
  
    return Follow;
  };
