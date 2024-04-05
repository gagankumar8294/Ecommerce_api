import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next)=> {

    const authHeader = req.header("authorization");

    if(!authHeader) {
        return res.status(401).send("No authorization etails found");
    }

    const base64Credentials = authHeader.replace('Basic', '');

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8')

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u => u.email==creds[0] && u.password==creds[1])

    if(user) {
        next();
    }
    else {
        return res.status(401).send("Incorrect Credentials")
    }

}


export default basicAuthorizer;