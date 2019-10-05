const user = require('../models/User');
const bcrypt = require('bcrypt');

class User {
    constructor() {
       this.user = user;
    }
    async createUser(username, firstName, lastName, password, img) {
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        
            this.data = new user({
                username,
                firstName,
                lastName,
                password: hash,
                img
            });

        await this.data.save();
        return this.data;
    }

    async getAllUsers() {
        this.data = await user.find();
        return this.data;
    }
    //needs to change param to _id
    async getUser(username) {
        this.data = await user.findOne({ username: username });
        return this.data;
    }

    async editUser(username, payload) {
        this.query = { username: username };

        this.data = await user.findOneAndUpdate(this.query, payload, { new: true });
        return this.data;
    }

    async login(payload) {
        this.data = await user.findOne({ username: payload.username });
        if (this.data) {
            var check = bcrypt.compareSync(payload.password, this.data.password);
            if (check) {
                return this.data;  
            } else {
                return "Wrong credentials";
            }
        }
    }
}

module.exports = User;