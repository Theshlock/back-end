const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, unique: true},//, required: true },
    icon: { type: String},// required: true },
    numSuccess: { type: Number}//, required: true },
});

const quizSchema = new Schema({
    name: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    createdDate: { type: Date, default: Date.now }
});

itemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});
itemSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});
quizSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});
quizSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
module.exports = mongoose.model('Item', itemSchema);

