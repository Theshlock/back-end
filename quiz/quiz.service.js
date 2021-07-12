const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Quiz = db.Quiz;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await Quiz.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await Quiz.find();
}

async function getById(id) {
    return await Quiz.findById(id);
}

async function create(quizParam) {
    // put items into list
    itemlist = []
    for (let i = 0; i < quizParam.items.length; i++) {
        var item = {
            "name" : quizParam.items[i]["name"],
            numSuccess : 0,
            icon: quizParam.items[i]["icon"]
        }
        itemlist.push(item) 
    }
    console.log(itemlist)
    // create quiz object
    var quiz = {
        name: quizParam["name"],
        hash: "711112333",
        items : itemlist
    }

    var quizObject = new Quiz(quiz);
    await quizObject.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}