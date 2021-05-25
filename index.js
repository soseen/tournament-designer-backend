const express = require('express');
const cors = require('cors');
const app = express();

const SERVER_PORT = 4000;

const db = require('./models');

app.use(express.json());
app.use(cors())

db.sequelize.sync().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log('server running...')
    })
})

app.post('/tournaments', (req, res) => {
    db.Tournament.create({
        name: req.body.name,
        format: req.body.format,
        pointsPerWin: req.body.pointsPerWin,
        pointsPerDraw: req.body.pointsPerDraw,
        bestOf: req.body.bestOf,
        finalsBestOf: req.body.finalsBestOf,
        allowDraws: req.body.allowDraws,
        double: req.body.double,
        includeScore: req.body.includeScore,
        isStarted: false,
        isFinished: false,
        iconId: req.body.iconId
    })
    .then(tournament => res.send(tournament))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get('/tournaments', (req, res) => {
    db.Tournament.findAll({
        include: [
            {
                model: db.Contestant,
                as: 'participants'
            },
            {
                model: db.Round,
                as: 'rounds',
                include: [
                    {
                        model: db.Match,
                        as: 'matches',
                        include: [
                            {
                                model: db.MatchResult,
                                as: 'matchResults'
                            }
                        ]
                    }
                ]
            },
            {
                model: db.TiebreakRule,
                as: 'tiebreakRules'
            }
        ]
    })
    .then(contestants => res.send(contestants))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get('/tournaments/:id', (req, res) => {
    db.Tournament.findAll({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: db.Contestant,
                as: 'participants'
            },
            {
                model: db.Round,
                as: 'rounds',
                include: [
                    {
                        model: db.Match,
                        as: 'matches',
                        include: [
                            {
                                model: db.MatchResult,
                                as: 'matchResults'
                            }
                        ]
                    }
                ]
            },
            {
                model: db.TiebreakRule,
                as: 'tiebreakRules'
            }
        ]
    })
    .then(tournament => res.send(tournament))
    .catch(err => {
        console.log(err)
        res.send("Tournament not found")
    })
})

app.put('/tournaments/:id', (req, res) => {
    db.Tournament.update(
        req.body.tournamentStarted,
        {where: {id: req.params.id}}
    )
    .then(tournament => res.send(tournament))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.post('/contestants', (req, res) => {
    db.Contestant.create({
        name: req.body.name,
        wins: 0,
        draws: 0,
        loses: 0,
        IsEliminated: false,
        TournamentId: req.body.tournamentId
    })
    .then(contestant => res.send(contestant))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.get('/contestants', (req, res) => {
    db.Contestant.findAll({
        include: [db.Tournament]
    })
    .then(contestants => res.send(contestants))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.post('/rounds', (req, res) => {
    db.Round.create({
        no: req.body.no,
        isFinished: false,
        TournamentId: req.body.tournamentId
    })
    .then(round => res.send(round))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.post('/matches', (req, res) => {
    db.Match.create({
        homeSideId: req.body.homeSideId,
        awaySideId: req.body.awaySideId,
        RoundId: req.body.roundId,
        isDraw: false,
        isFinished: false
    })
    .then(match => res.send(match))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

app.post('/tiebreakRules', (req, res) => {
    db.TiebreakRule.create({
        name: req.body.name,
        priority: req.body.priority,
        desc: req.body.desc,
        TournamentId: req.body.tournamentId
    })
    .then(tRule => res.send(tRule))
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

