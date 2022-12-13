const { Thought, User } = require('../models/')


const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) =>
                res.status(200).json(thought))
            .catch((err) => 
                res.status(500).json(err));   
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ 
                        message: 'No thought found' 
                        })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },