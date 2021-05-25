module.exports = (sequelize, DataTypes) => {

    const Match = sequelize.define("Match", {
        homeSideId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        awaySideId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        scoreHome: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        scoreAway: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isDraw: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    })

    Match.associate = (models) => {
        Match.hasMany(models.MatchResult, {
            foreignKey: 'MatchId',
            as: 'matchResults',
            onDelete: "CASCADE"
        });
        Match.belongsTo(models.Round, {
            foreignKey: 'RoundId',
            as: 'matches',
            onDelete: "CASCADE"
        });
    }
    return Match
}