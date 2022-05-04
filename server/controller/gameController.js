const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');
const Event = require('../models/eventModel');
const EventCard = require('../models/cardEventModel');
const Card = require('../models/cardModel');

const gameController = {};

/**
 * @desc get one level with all events and cards
 * @route GET /game/get-level/${name}
 * @access public
 */
gameController.getLevel = asyncHandler(async (req, res) => {
    try {
        // levelSchema to return
        let tempLevel1 = {
            _id: String,
            name: String,
            token: String,
            events: {type: Object}
        };
        const tempLevel2 = await Level.find({token: req.params.token});
        tempLevel1._id = tempLevel2[0].id;
        tempLevel1.name = tempLevel2[0].name;
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
                    nextImage: String
                };

                cards._id  = card._id;
                cards.name  = card.name;
                cards.text  = card.text;
                cards.points  = card.points;
                cards.nextEvent  = card.nextEvent;
                cards.nextImage  = card.nextImage;
                cards1.push(cards);
            }
            tempLevel1.events[i].cards = cards1;
        }

        const level = tempLevel1;

        res.status(200).json({ level });
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
        const allLevels = await Level.find();
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
        const level = await Level.findById(req.params.levelId);
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
        const event = await Event.find({ levelId: req.params.levelId });
        console.log(event);
        res.status(200).json({ event });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/**
 * @desc get all cards for one event
 * @route GET /game/get-event-cards/${eventId}
 * @access public
 */
gameController.getEventCards =  asyncHandler(async (req, res) => {
    try {
        const eventCard = await EventCard.find({ eventId: req.params.eventId });
        console.log(eventCard);
        res.status(200).json({ eventCard });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/**
 * @desc get one card
 * @route GET /game/get-card/${cardId}
 * @access public
 */
gameController.getCard =  asyncHandler(async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId);
        console.log(card);
        res.status(200).json({ card });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = gameController;