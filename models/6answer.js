module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answers",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            answer: {
                type: DataTypes.STRING
            },
        });
    Answer.associate = function (models) {
        Answer.belongsTo(models.questions, {
            foreignKey: "question_id"
        });
        Answer.belongsTo(models.users, {
            foreignKey: "user_id"
        })
    };
    return Answer;
}