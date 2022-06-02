const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');
const Event = require('../models/eventModel');
const EventCard = require('../models/cardEventModel');
const Card = require('../models/cardModel');
const LevelCol = require('../models/levelColModel');

const gameController = {};

/**
 * @desc get one level with all events and cards
 * @route GET /game/get-level/${name}
 * @access public
 */
gameController.getLevel = asyncHandler(async (req, res) => {
    try {
        const level1 = await LevelCol.find({token: req.params.token});
        const level = level1[0];
        res.status(200).json( {level} );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @desc add all level data LevelCol collection
 * @route POST /game/post-level-data/${name}
 * @access public
 */
gameController.postLevelData = asyncHandler(async (req, res) => {
    try {
        // delete old entries with the same token (only if exist)
        const levelToDelete = await LevelCol.find({token: req.params.token});
        if(levelToDelete.length > 0) {
            for (let i = 0; i < levelToDelete.length; i++) {
                await LevelCol.deleteOne({token: req.params.token});
            }
        }

        // levelSchema to return
        let tempLevel1 = {
            _id: String,
            name: String,
            token: String,
            description: String,
            events: {type: Object},
            maxScore: Number
        };
        const tempLevel2 = await Level.find({token: req.params.token});
        tempLevel1._id = tempLevel2[0].id;
        tempLevel1.name = tempLevel2[0].name;
        tempLevel1.token = tempLevel2[0].token;
        tempLevel1.description = tempLevel2[0].description;
        tempLevel1.maxScore = tempLevel2[0].maxScore;
        const levelId = tempLevel1._id;
        const events = await Event.find({levelId: levelId});
        for (let i = 0; i < events.length; i++) {
            // eventSchema to return
            let event =  {
                _id: String,
                name: String,
                text: Array,
                levelId: String,
                cards: {type: Object}
            };
            event._id  = events[i]._id;
            event.name  = events[i].name;
            event.text  = events[i].text;
            event.levelId  = events[i].levelId;
            tempLevel1.events[i] = event;
        }

        for (let i = 0; i < Object.keys(tempLevel1.events).length - 1; i++) {
            const cardEvents = await EventCard.find({eventId: tempLevel1.events[i]._id.toHexString()});
            const ids = [];
            cardEvents.forEach(e => ids.push(e.cardId));
            const cards1 = [];
            for (const id of ids) {
                const card = await Card.findById(id);
                let cards =  {
                    // cardSchema to return
                    _id: String,
                    name: String,
                    text: Array,
                    points: Number,
                    nextEvent: Number,
                    nextImage: String,
                    nextEventText: Number,
                    image: String,
                    costs: Number
                };

                cards._id  = card._id;
                cards.name  = card.name;
                cards.text  = card.text;
                cards.points  = card.points;
                cards.nextEvent  = card.nextEvent;
                cards.nextImage  = card.nextImage;
                cards.nextEventText = card.nextEventText;
                cards.image = card.image;
                cards.costs = card.costs;

                cards1.push(cards);
            }
            tempLevel1.events[i].cards = cards1;
        }

        let level = {
            type: Object
        }
        level = tempLevel1;

        await LevelCol.insertMany(level);


        res.status(200).json(level);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @desc get all levels
 * @route GET /game/get-all-levels
 * @access public
 */
gameController.getAllLevels = asyncHandler(async (req, res) => {
    try {
        const allLevels = await LevelCol.find();
        res.status(200).json({ allLevels });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @desc get level name
 * @route GET /game/get-level-name/{levelId}
 * @access public
 */
gameController.getLevelName = asyncHandler(async (req, res) =>{
    try {
        const level = await LevelCol.findById(req.params.levelId);
        const levelName = level.name;
        res.status(200).json({ levelName });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @desc get all events for one level
 * @route GET /game/get-events/${levelId}
 * @access public
 */
gameController.getEvents =  asyncHandler(async (req, res) => {
    try {
        const level = await LevelCol.find({ _Id: req.params.levelId });
        const event = level[0].events;
        res.status(200).json({ event });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = gameController;