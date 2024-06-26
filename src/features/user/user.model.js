export default class UserModel {

    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static getAll() {
        return users;
    }
}

let users = [
    {
    id: 1,
    name: "seller User",
    email: "seller@example.com",
    password: "password",
    type: "seller"
    },
    {
        id: 2,
        name: "buyer User",
        email: "buyer@gmail.com",
        password: "password2",
        type: "buyer",
    }
]