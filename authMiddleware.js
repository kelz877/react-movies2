const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    console.log("middleware called...")
    let headers = req.headers['authorization']

    if(headers){
        const token = headers.split(' ')[1]
        console.log(token)
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(decoded){
            const username = decoded.username
            //check in the database id the user exists
            const persistedUser = users.find(u => u.username === username)
            if(persistedUser){
                next()
            }else{
                res.json({error: 'Invalid Credentials'})
            }
        }else{
            res.json({error: 'Unauthorized access'})
        }
    }else {
        res.json({error: 'Unauthorized Access'})
    }



}module.exports = authenticate