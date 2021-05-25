module.exports = (sequelize, DataTypes) => {

    const Contestant = sequelize.define("Contestant", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        draws: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        loses: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        IsEliminated: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    })

    Contestant.associate = (models) => {
        Contestant.belongsTo(models.Tournament, {
            foreignKey: 'TournamentId',
            as: 'participants',
            onDelete: "CASCADE"
        });
    }

    return Contestant
}