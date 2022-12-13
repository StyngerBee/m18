const { User, Thought } = require('../models/');

const userController = {

    getUsers(req, res) {
        User.find()
            .then((users) => 
                res.status(200).json(users))
            .catch((err) => 
                res.status(500).json(err));
    },
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .then((user) =>
            !user
              ? res.status(404).json({  message: 'No Users found' })
              : res.status(200).json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
       
        User.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate( { _id: req.body.userId },{ $addToSet: { thoughts: thought._id}}, { new: true })
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ 
                        message: 'ID not found ' 
                    })
                    : res.status(200).json('Added User')
            )     
            .catch((err) => res.status(500).json(err));
    },
}

module.exports =