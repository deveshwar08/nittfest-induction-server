module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("questions",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            question: {
                type: DataTypes.TEXT
            },
        }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false,
    });
    Question.associate = function (models) {
        Question.belongsTo(models.domains, {
            foreignKey: "domain_id"
        });
        Question.hasMany(models.answers);
    };
    return Question;
}