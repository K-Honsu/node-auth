const db = require('../users/users.db')

const checkBody = (req, res, next) => {
    // first check req body
    if (!req.body){
        res.status(400).json({
            data:null,
            error:'must have body'
        })
    }
    next()
}

// const basicAuth = (req, res, next) => {
//     const headers = req.headers.authorization

//     if(!headers){
//         res.status(401).json({message:'You are not authenticated'})
//     }
//     const auth = new Buffer.from(headers.split(' ')[1], 'base64').toString().split(':');
//     const username = auth[0]
//     const password = auth [1]

//     const existingUser = db.db_users.find(user => user.username === username && user.password === password)
//     if (existingUser){
//         req.user = existingUser
//         next()
//     }else{
//         return res.status(401).json({message : "Sorry, you are not authenticated"})
//     }
// }

const apiKey = (req, res, next) => {
    const headers = req.headers

    if(!headers.api_key){
        return res.status(401).json({
            message : "ooops!, you are not authorized"
        })
    }

    const existingUser = db.db_users.find(user => user.api_key === headers.api_key)
    if (existingUser){
        req.user = existingUser
        next()
    }else{
        return res.status(401).json({
            message : "ooops!, you are not authenticated"
        })
    }
}

const checkAdmin = (req, res, next) =>{
    if(req.user.user_type !== 'admin'){
        return res.status(403).json({
            message: "You are not authorized"
        })
    }
    next()
}

module.exports = {
    checkBody,
    // basicAuth,
    apiKey,
    checkAdmin
}