﻿const express = require('express');
const router = express.Router();
const userService = require('./quiz.service');


const db = require('_helpers/db');

const Quiz = db.Quiz;

const Item  = db.Item;

// routes
// router.post('/authenticate', authenticate);
router.post('/create', create);
router.get('/', getAll);
// router.get('/current', getCurrent);
// router.get('/:id', getById);
// router.put('/:id', update);
// router.delete('/:id', _delete);

router.get("/test", test)

router.get("/test2", test2)


module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function test(req, res, next){
    var test = await Quiz.find().populate('items')
    console.log('brappp')
    res.json(test)
}
    
async function test2(req, res, next){
    var item1 = {
        name : "712132",
        numSuccess : 0,
        icon: "711232"
    }
    console.log(item1)

    var item2 = {
        name : "722132",
        numSuccess : 0,
        icon: "721232"
    }
    console.log(item2)

    var itemList0 = [item1, item2]

    var quiz = {
        name: "7112233",
        hash: "711112333",
        items : itemList0
    }

    var quizObject = new Quiz(quiz)
   
    await quizObject.save();
    res.json(quiz)
}