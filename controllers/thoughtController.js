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
    createThought(req, res) {
        // Create new thought then find and assign to user by id
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate( { _id: req.body.userId }, { $addToSet: { thoughts: thought._id}}, { new: true })
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ 
                        message: 'No user matches ID' 
                    })
                    : res.status(200).json('Thought added')
            )     
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        
        Thought.findOneAndUpdate( { _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ 
                        message: 'No Thought found' 
                    })
                    : res.status(200).json(thought)
            )     
            .catch((err) => res.status(500).json(err));
    },
    