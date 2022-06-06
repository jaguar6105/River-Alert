module.exports = function(sequelize, DataTypes) {
    const River = sequelize.define("river", {
      river_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      river_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }}, 
      {freezeTableName: true}
);  
  
    return River;
  };
