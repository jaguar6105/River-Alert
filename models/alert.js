module.exports = function(sequelize, DataTypes) {
    const alert = sequelize.define("alert", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      alertType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alertLimit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      riverId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
      {freezeTableName: true}
);  
  
    return alert;
  };
