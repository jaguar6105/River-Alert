module.exports = function (sequelize, DataTypes) {
    const Station = sequelize.define("station", {
        stationlocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        api_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        riverName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
            {freezeTableName: true}
        

    );

    return Station;
};