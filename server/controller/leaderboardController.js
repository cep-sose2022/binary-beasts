const asyncHandler = require('express-async-handler');
const Leaderboard = require('../models/leaderboardModel');

const leaderBoardController = {};

/**
 * @desc get all entries in LeaderBoard collection
 * @route GET /leaderboard/get-leaderboard
 * @access public
 */
leaderBoardController.getLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find();
        console.log(leaderboard);
        res.status(200).json({ leaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

/**
 * @desc get all entries in LeaderBoard collection for one user
 * @route GET /leaderboard/get-user-leaderboard/${username}
 * @access public
 */
leaderBoardController.getUserLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const userLeaderboard = await Leaderboard.find({ username: req.params.username });
        console.log(userLeaderboard);
        res.status(200).json({ userLeaderboard });
    } catch (err) {
        res.json({ message: err.message });
    }
})

/**
 * @desc post new entire in Leaderboard collection
 * @route POST /leaderboard/post-leaderboard
 * @access public
 */
leaderBoardController.postLeaderboard =  asyncHandler(async (req, res) => {
    try {
        let userLevel = req.body;
        let newLevelLeaderboard;
        const userLeaderboard = await Leaderboard.find({ username: req.body.username, levelId: req.body.levelId } );
        if(!userLeaderboard) {
            newLevelLeaderboard = new Leaderboard(userLevel);
            await newLevelLeaderboard.save();
        } else if (userLeaderboard.length > 0) {
            for (let i = 0; i < userLeaderboard.length; i++){
                if(userLeaderboard[i].score < req.body.score){
                    // delete old entries with the same username & levelId
                    await Leaderboard.deleteOne({ _id: userLeaderboard[i]._id});

                    // add the new entry
                    newLevelLeaderboard = new Leaderboard(userLevel);
                    await newLevelLeaderboard.save();
                } else {
                    newLevelLeaderboard = userLeaderboard[i];
                }
            }
        }

        res.status(201).json({ newLevelLeaderboard });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

/**
 * @desc delete all entries in Leaderboard collection
 * @route DELETE /leaderboard/delete-leaderboard
 * @access public
 */
leaderBoardController.deleteLeaderboard =  asyncHandler(async (req, res) => {
    try {
        const findUser = await Leaderboard.find();
        for(const obj in findUser){
            await Leaderboard.deleteOne(obj._id);
        }
        res.status(204).json({ message: 'deleted' });
    } catch (err) {
        res.json({ message: err.message });
    }
})

/**
 * @desc return a sorted list from LeaderBoard collection
 * @route GET /leaderboard/get-scores
 * @access public
 */
leaderBoardController.getScores =  asyncHandler(async (req, res) => {
    try {
        const userLeaderboard = await Leaderboard.find();
        let users = [];

        // save all usernames in array
        for (let i = 0; i < userLeaderboard.length; i++) {
            if (!users.find(e => e.username === userLeaderboard[i].username)) {
                let data = {
                    rank: Number,
                    username: String,
                    score: Number
                };
                data.username = userLeaderboard[i].username;
                users.push(data);
            }
        }

        // calculate scores for users
        for (let i = 0; i < users.length; i++) {
            let score = 0;
            for (let j = 0; j < userLeaderboard.length; j++) {
                if (users[i].username === userLeaderboard[j].username){
                    score += userLeaderboard[j].score;
                }

            }
            users[i].score = score;
        }

        // sort the list
        const sortedUsers = sortUserScore(users);

        // add rank
        for (let i = 0; i < sortedUsers.length; i++){
            sortedUsers[i].rank = i + 1;
        }

        res.status(200).json({ sortedUsers });
    } catch (err) {
        res.json({ message: err.message });
    }
    function sortUserScore(array, half = array.length/2) {
        if(array.length < 2){
            return array
        }

        const left = array.splice(0,half); //left part of array

        return merger(sortUserScore(left),sortUserScore(array))
    }


    function merger(left,right){
        const arr = [];

        while(left.length && right.length){
            if(left[0].score > right[0].score){
                arr.push(left.shift())
            }else{
                arr.push(right.shift())
            }
        }

        return [...arr,...left,...right];

    }
})

module.exports = leaderBoardController;