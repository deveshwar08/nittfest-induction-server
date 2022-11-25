module.exports = (sequelize, DataTypes) => {
    const Domain = sequelize.define("domains",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            domain: {
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
        });
    Domain.associate = function (models) {
        Domain.hasMany(models.answers);
        Domain.hasMany(models.preferences);
    }
    return Domain;
}