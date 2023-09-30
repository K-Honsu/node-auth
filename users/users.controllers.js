const db = require('../users/users.db')

const createUser = (req, res) => {
    const user = req.body

    user.api_key = `${user.username}_${user.password}`
    if (user.username === "emmanuel" || user.username === "daniel"){
        user.user_type = "admin"
    }else{
        user.user_type = "normie"
    }

    db.db_users.push(user)
    console.log(db);

    return res.status(201).json({
        message : "User Created Successfully"
    })
}

module.exports = {
    createUser
}