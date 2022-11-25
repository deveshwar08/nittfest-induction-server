module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("users",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            mobile_number: {
                type: DataTypes.STRING
            },
            gender: {
                type: DataTypes.STRING
            },
            fcm_token: {
                type: DataTypes.STRING
            },
        });

    User.associate = function (models) {
        User.belongsTo(models.departments, {
            foreignKey: "department_id"
        });
    };
    return User;
}