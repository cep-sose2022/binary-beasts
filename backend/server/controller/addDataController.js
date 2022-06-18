const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');
const Event = require('../models/eventModel');
const Card = require('../models/cardModel');
const CardEvent = require('../models/cardEventModel');
const _CopyOfCardEvent = require("../models/backupModels/_CopyOfCardEventModel");

const addDataController = {};

/**
 * add a new level to Level collection
 */
addDataController.postLevel =  asyncHandler(async (req, res) => {
    try {
        let level = req.body;
        const newLevel = new Level(level);
        await newLevel.save();
        const id = newLevel._id.toHexString();

        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * add a new event to Event collection
 */
addDataController.postEvent =  asyncHandler(async (req, res) => {
    try {
        let event = req.body;
        const newEvent = new Event(event);
        await newEvent.save();
        const id = newEvent._id.toHexString();

        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * add a new card to Card collection
 */
addDataController.postCard =  asyncHandler(async (req, res) => {
    try {
        let card = req.body;
        const newCard = new Card(card);
        await newCard.save();
        const id = newCard._id.toHexString();

        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * add a new cardEvent to CardEvent collection
 */
addDataController.postCardEvent =  asyncHandler(async (req, res) => {
    try {
        let cardEvent = req.body;
        let newCardEvent
        let tempCardEvent = {
            cardId: String,
            eventId: String,
        };

        for(let i = 0; i < cardEvent.cardIds.length; i++) {
            tempCardEvent.cardId = cardEvent.cardIds[i];
            console.log(cardEvent.cardIds[i]);
            tempCardEvent.eventId = cardEvent.eventId;
            newCardEvent = new CardEvent(tempCardEvent);
            await newCardEvent.save();
        }

        res.status(201).json({ 'success': true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = addDataController;