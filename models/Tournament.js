module.exports = (sequelize, DataTypes) => {
    
    const Tournament = sequelize.define("Tournament", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        pointsPerWin: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pointsPerDraw: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        bestOf: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        finalsBestOf: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        allowDraws: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        double: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        includeScore: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isStarted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        iconId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })


    Tournament.associate = (models) => {
        Tournament.hasMany(models.Round, {
            foreignKey: 'TournamentId',
            as: 'rounds'
        });
        Tournament.hasMany(models.Contestant, {
            foreignKey: 'TournamentId',
            as: 'participants'
        });
        Tournament.hasMany(models.TiebreakRule, {
            foreignKey: 'TournamentId',
            as: 'tiebreakRules'
        });
    }

    return Tournament
}