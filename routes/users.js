const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../repository/User');
const user = new User();

//create users
router.post('/user/new', [
    check('username').isLength({ min: 5 }),
    check('firstName').isLength({ min: 3 }),
    check('lastName').isLength({ min: 3 }),
    check('password').isLength({ min: 4 }),
    check('img').optional().isString()
], (req, res) => {
    var username = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.firstName;
    var password = req.body.password;
    var img = req.body.img || null;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    user.createUser(username, firstName, lastName, password, img)
    .then((resp) => {
        this.data = resp;
        res.json({ "Success": this.data });
    })
    .catch((err) => {
        res.status(422).json({"Error": err.message });
    });
});

//get all users
router.get('/users/', (req, res) => {
    user.getAllUsers().then((resp) => {
        this.data = resp;
        res.json({ "Users:": this.data });
    }).catch((err) => {
        res.status(422).json({"Error": err.message });
    });
});

//get user data
router.get('/user/:username', (req, res) => {
    var username = req.params.username;
    user.getUser(username)
    .then((resp) => {
        this.data = resp;
        res.json({ "User": this.data });
    })
    .catch((err) => {
        res.status(422).json({"Error": err.message });
    });
});

//edit user data
router.put('/user/:data', [
    check('username').optional().isLength({min: 5}),
    check('firstName').optional().isLength({ min: 3 }),
    check('lastName').optional().isLength({ min: 3 }),
    check('password').optional().isLength({ min: 4 }),
    check('img').optional().isString()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var data = req.params.data;

    const payload = { updatedAt: new Date()};
    if (req.body.username) {
        var username = req.body.username;
        payload.username = username;
    }

    if (req.body.firstName) {
        var firstName = req.body.firstName;
        payload.firstName = firstName;
    }

    if (req.body.lastName) {
        var lastName = req.body.lastName;
        payload.lastName = lastName;
    }

    if (req.body.password) {
        var password = req.body.password;
        payload.password = password;
    }

    user.editUser(data, payload)
    .then((resp) => {
        this.data = resp;
        console.log(this.data);
        res.json({ "Updated": this.data });
    })
    .catch((err) =>{
        res.status(422).json({"Error": err.message });
    });
});

router.post('/users/login', [
    check('username').isLength({ min: 5 }),
    check('password').isLength({ min: 4 }),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    var payload = {
        username: req.body.username,
        password: req.body.password
    }

    user.login(payload).then((resp) =>{
        if (resp == 'Wrong credentials') {
            return res.status(400).json({ "Message": resp });
        } else if(resp) {
            res.json({ "Message": resp });
        } else {
            res.status(402).json({ "Message": resp})
        }
    }).catch ((err) => {
        res.status(422).json({"Error": err.message });
    });

});

module.exports = router;

