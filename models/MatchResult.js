module.exports = (sequelize, DataTypes) => {

    const MatchResult = sequelize.define("MatchResult", {
        scoreHomeSide: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        scoreAwaySide: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isDraw: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    })

    MatchResult.associate = (models) => {
        MatchResult.belongsTo(models.Match, {
            foreignKey: 'MatchId',
            as: 'matchResults',
            onDelete: "CASCADE"
        });
    }

    return MatchResult
}