const db = require('../users/users.db')

const validateUserCreation = (req, res, next) => {
    if (!req.body.username || !req.body.username.trim()){
        return res.status(400).json({error : "Your username is required."})
    }

    if (!req.body.password || !req.body.password.trim()){
        return res.status(400).json({error:"Your password is required."})
    }

    next()
}

const checkExistingUser = (req, res, next) => {
    const body = req.body;
    const existingUser = db.db_users.find(user => user.username == body.username)
    if (existingUser){
        return res.status(400).json({
            error : "You are receiving this message because a user currently exist with the same username"
        })
    }
    next()
  };

module.exports = {
    validateUserCreation,
    checkExistingUser
}