module.exports = (sequelize, DataTypes) => {
    const Preferences = sequelize.define("preferences",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            preference_no: {
                type: DataTypes.INTEGER
            }
        });
    Preferences.associate = function (models) {
        Preferences.belongsTo(models.domains, {
            foreignKey: "domain_id"
        });
        Preferences.belongsTo(models.users, {
            foreignKey: "user_id"
        })
    }
    return Preferences;
}