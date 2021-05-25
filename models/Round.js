module.exports = (sequelize, DataTypes) => {

    const Round = sequelize.define("Round", {
        no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    Round.associate = (models) => {
        Round.hasMany(models.Match, {
            foreignKey: 'RoundId',
            as: 'matches',
            onDelete: "CASCADE"
        });
        Round.belongsTo(models.Tournament, {
            foreignKey: 'TournamentId',
            as: 'rounds',
            onDelete: "CASCADE"
        });
    }

    return Round
}