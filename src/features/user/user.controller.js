import UserModel from "./user.model.js";
import  Jwt  from "jsonwebtoken";

export default class UserController {
    
    signUp(req, res) {
        const { name, email, password, type, } = req.body;
        const user = UserModel.signUp(name, email, password, type,);
        res.status(201).send(user)
    }
 
    signIn(req, res) {
        const result = UserModel.signIn(req.body.email, req.body.password);
        if(!result){
            return res.status(400).send('Incorrect credentials');
        } else {

            // create token
            const token = Jwt.sign(
                {
                    userID: result.id,
                    email: result.email,
                },
                '4d6WiMD3lQ',
                {
                    expiresIn: '1h',
                }
            )

            // Send token
            return res.status(200).send(token);
        }
    }
}