module.exports = function(sequelize, DataTypes) {
    const Measure = sequelize.define("measure", {
      riverValue: {
        type: DataTypes.STRING,
        allowNull: false
      },
      riverId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
      {freezeTableName: true}
);  
  
    return Measure;
  };
