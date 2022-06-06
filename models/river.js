module.exports = function(sequelize, DataTypes) {
    const River = sequelize.define("river", {
      river_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }},
      {freezeTableName: true}
);  
  
    return River;
  };
