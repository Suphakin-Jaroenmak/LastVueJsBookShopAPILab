
const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

exports.sign = function(user, secretkey){

    const jwt  = require('jsonwebtoken');

    try{
        
        //return jwt.sign({ id: user._id }, secretkey, { expiresIn: 3600   }); //expires in 1 hour
        return jwt.sign(user, secretkey); //Never expire
    }
    catch(e){
        console.log('err');
        //return res.status(401).send()
    }
}

exports.verify = function(req, res, next){

    const jwt  = require('jsonwebtoken');
    const secretkey=process.env.SECRET;

    let accessToken = getTokenFrom(req)
    

    if (!accessToken){        
        return res.status(403).send()
    }

    let payload

    try{

 
        jwt.verify(accessToken, secretkey, (err, authData) => {

            
            if(err) {
                console.log("401") 
                return res.status(401).send()
            } else {
                console.log("err") 
            }
        });
        
        next()

    }
    catch(e){

        return res.status(401).send()
    }
}