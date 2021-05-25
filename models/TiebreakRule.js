module.exports = (sequelize, DataTypes) => {

    const TiebreakRule = sequelize.define("TiebreakRule", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    TiebreakRule.associate = (models) => {
        TiebreakRule.belongsTo(models.Tournament, {
            foreignKey: 'TournamentId',
            as: 'tiebreakRules',
            onDelete: "CASCADE"
        });
    }

    return TiebreakRule
}