module.exports = function (sequelize, DataTypes) {
    const Station = sequelize.define("station", {
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        api_id: {
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

    return Station;
};