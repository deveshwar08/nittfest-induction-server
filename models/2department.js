module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("departments",
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
            description: {
                type: DataTypes.STRING
            },
        },
        {
            timestamps: false,

            createdAt: false,

            updatedAt: false,
        }
    );
    Department.associate = function (models) {
        Department.hasMany(models.users);
    }
    return Department;
}