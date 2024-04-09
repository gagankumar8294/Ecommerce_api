import jwt from "jsonwebtoken"

const jwtAuth = (req, res, next) => {
    //1. Read the token
   
    const token = req.headers['authorization']
    console.log(token);
    //2. if no token, return the error
    if(!token) {
        return res.status(401).send('Unauthorized')
    } 

    //3. check if token is valid
    try {
        const payload = jwt.verify(
            token, 
            '4d6WiMD3lQ'
        ); 
        console.log(payload);
        next();
    } catch (err) {
        console.log(err);
    // retuen error
        return res.status(401).send('Unauthorized')
    }
    //4 call next middleware
    next();
}

export default jwtAuth;