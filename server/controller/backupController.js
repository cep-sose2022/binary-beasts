const asyncHandler = require('express-async-handler');
const _CopyOfCardEvent = require('../models/backupModels/_CopyOfCardEventModel');
const CardEvent = require("../models/cardEventModel");
const _CopyOfCard = require('../models/backupModels/_CopyOfCardModel');
const Card = require("../models/cardModel");
const _CopyOfEvent = require('../models/backupModels/_CopyOfEventModel');
const Event = require("../models/eventModel");
const _CopyOfLeaderboard = require('../models/backupModels/_CopyOfLeaderboardModel');
const Leaderboard = require("../models/leaderboardModel");
const _CopyOfLevel = require('../models/backupModels/_CopyOfLevelModel');
const Level = require("../models/levelModel");
const _CopyOfUser = require('../models/backupModels/_CopyOfUserModel');
const User = require("../models/userModel");

const backupController = {};

/**
 * @desc make a copy from CardEvent collection
 * @route post /backup/post-card-event-backup
 * @access public
 */
backupController.postCardEventBackup =  asyncHandler(async (req, res) => {
    try {
        const cardEvent = await CardEvent.find();
        const deleteOldCopy = await _CopyOfCardEvent.find();
        for(const obj in deleteOldCopy){
            await _CopyOfCardEvent.deleteOne(obj._id);
        }
        await cardEvent.forEach(e => _CopyOfCardEvent.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup cardEvent
 * @route get /backup/get-card-event-backup
 * @access public
 */
backupController.getCardEventBackup =  asyncHandler(async (req, res) => {
    try {
        const copyCardEvent = await _CopyOfCardEvent.find();
        res.status(200).json({ copyCardEvent });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * @desc make a copy from Card collection
 * @route post /backup/post-card-backup
 * @access public
 */
backupController.postCardBackup =  asyncHandler(async (req, res) => {
    try {
        const card = await Card.find();
        const deleteOldCopy = await _CopyOfCard.find();
        for(const obj in deleteOldCopy){
            await _CopyOfCard.deleteOne(obj._id);
        }
        await card.forEach(e => _CopyOfCard.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup card
 * @route get /backup/get-card-backup
 * @access public
 */
backupController.getCardBackup =  asyncHandler(async (req, res) => {
    try {
        const copyCard = await _CopyOfCard.find();
        res.status(200).json({ copyCard });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * @desc make a copy from Event collection
 * @route post /backup/post-event-backup
 * @access public
 */
backupController.postEventBackup =  asyncHandler(async (req, res) => {
    try {
        const event = await Event.find();
        const deleteOldCopy = await _CopyOfEvent.find();
        for(const obj in deleteOldCopy){
            await _CopyOfEvent.deleteOne(obj._id);
        }
        await event.forEach(e => _CopyOfEvent.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup event
 * @route get /backup/get-event-backup
 * @access public
 */
backupController.getEventBackup =  asyncHandler(async (req, res) => {
    try {
        const copyEvent = await _CopyOfEvent.find();
        res.status(200).json({ copyEvent });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * @desc make a copy from LeaderBoard collection
 * @route post /backup/post-leaderboard-backup
 * @access public
 */
backupController.postLeaderboardBackup =  asyncHandler(async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find();
        const deleteOldCopy = await _CopyOfLeaderboard.find();
        for(const obj in deleteOldCopy){
            await _CopyOfLeaderboard.deleteOne(obj._id);
        }
        await leaderboard.forEach(e => _CopyOfLeaderboard.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup leaderboard
 * @route get /backup/get-leaderboard-backup
 * @access public
 */
backupController.getLeaderboardBackup =  asyncHandler(async (req, res) => {
    try {
        const copyLeaderboard = await _CopyOfLeaderboard.find();
        res.status(200).json({ copyLeaderboard });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * @desc make a copy from Level collection
 * @route post /backup/post-level-backup
 * @access public
 */
backupController.postLevelBackup =  asyncHandler(async (req, res) => {
    try {
        const level = await Level.find();
        const deleteOldCopy = await _CopyOfLevel.find();
        for(const obj in deleteOldCopy){
            await _CopyOfLevel.deleteOne(obj._id);
        }
        await level.forEach(e => _CopyOfLevel.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup level
 * @route get /backup/post-level-backup
 * @access public
 */
backupController.getLevelBackup =  asyncHandler(async (req, res) => {
    try {
        const copyLevel = await _CopyOfLevel.find();
        res.status(200).json({ copyLevel });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

/**
 * @desc make a copy from User collection
 * @route post /backup/post-user-backup
 * @access public
 */
backupController.postUserBackup =  asyncHandler(async (req, res) => {
    try {
        const user = await User.find();
        const deleteOldCopy = await _CopyOfUser.find();
        for(const obj in deleteOldCopy){
            await _CopyOfLeaderboard.deleteOne(obj._id);
        }
        await user.forEach(e => _CopyOfUser.insertMany(e));
        res.status(200).json({success: true});
    } catch (err) {
        res.json({ message: err.message });
    }
});

/**
 * @desc get backup user
 * @route get /backup/post-user-backup
 * @access public
 */
backupController.getUserBackup =  asyncHandler(async (req, res) => {
    try {
        const copyUser = await _CopyOfUser.find();
        res.status(200).json({ copyUser });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = backupController;