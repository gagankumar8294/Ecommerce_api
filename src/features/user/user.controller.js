import UserModel from "./user.model.js";
import  Jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }
    
    async signUp(req, res, next) {
        const { name, email, password, type, } = req.body;
        const user = new UserModel(name, email, password, type,);
        await this.userRepository.signUp(user);
        res.status(201).send(user)
    }
 
    async signIn(req, res) {
        try {
        const result = await this.userRepository.signIn(req.body.email, req.body.password);
        if(!result){
            return res.status(400).send('Incorrect credentials');
        } else {

            // 1. create token
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

            // 2. Send token
            return res.status(200).send(token);
        }
        }catch{err}{
            console.log(err);
            return res.status(200).send("Something Went wrong")
            next(err);
        }
    }
}