const { Thought, User } = require('../models/')


const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) =>
                res.status(200).json(thoughts))
            .catch((err) => 
                res.status(500).json(err));   
    },