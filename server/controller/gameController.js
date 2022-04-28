const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');
const Event = require('../models/eventModel');
const EventCard = require('../models/cardEventModel');
const Card = require('../models/cardModel');
const Leaderboard = require('../models/leaderboardModel');

/**
 * returns one level with all events and cards
 */
const getLevel = asyncHandler(async (req, res) => {
    try {
        const level = await Level.find({name: req.params.name});
        const levelId = level[0]._id.toHexString();
        const events = await Event.find({levelId: levelId});
        level.push({events});

        for (let i = 0; i < level[1].events.length; i++) {
            const cardEvents = await EventCard.find({eventId: level[1].events[i]._id.toHexString()});
            const ids = [];
            cardEvents.forEach(e => ids.push(e.cardId));
            const cards1 = [];
            for (const id of ids) {
                const card = await Card.findById(id);
                cards1.push(card);
            }

            const cards = {
                event: i + 1,
                cards: cards1,
            };
            level.push(cards);
        }
        res.status(200).json({ level });
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * returns all levels
 */
const getAllLevels = asyncHandler(async (req, res) => {
    try {
        const allLevels = await Level.find();
        res.status(200).json({ allLevels });
    } catch (err) {
        res.json({ message: err.message });
    }
});

const getEvent =  asyncHandler(async (req, res) => {
    try {
        const event = await Event.find({ levelId: req.params.levelId });
        console.log(event);
        res.status(200).json({ event });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getEventCard =  asyncHandler(async (req, res) => {
    try {
        const eventCard = await EventCard.find({ eventId: req.params.eventId });
        console.log(eventCard);
        res.status(200).json({ eventCard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getCard =  asyncHandler(async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        console.log(card);
        res.status(200).json({ card });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find();
        console.log(leaderboard);
        res.status(200).json({ leaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const getUserLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const userLeaderboard = await Leaderboard.find({ username: req.params.username });
        console.log(userLeaderboard);
        res.status(200).json({ userLeaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

const postLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const userLevel = req.body;
        console.log(userLevel);
        const newLevelLeaderboard = new Leaderboard(userLevel);
        await newLevelLeaderboard.save();
        
        res.status(200).json({ newLevelLeaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = {
    getLevel, getAllLevels, getEvent, getEventCard, getCard, getLeaderboard, getUserLeaderboard, postLeaderboard
}