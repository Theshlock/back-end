const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const Quiz = db.Quiz;
const Item  = db.Item;


router.post('/quiz', (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to create a quiz' */

    /*	#swagger.parameters['quiz'] = {
            in: 'body',
            description: 'Quiz information.',
            required: true,
            schema: { $ref: "#/definitions/Quiz" }
    } */

    console.log(req.body.name)

    res.status(201).json({
        data: [],
        message: 'Authentication successed'
    })
})

router.put('/quiz', (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to edit a quiz' */

    /*	#swagger.parameters['quiz'] = {
            in: 'body',
            description: 'Quiz information.',
            required: true,
            schema: { $ref: "#/definitions/Quiz" }
    } */

    res.status(201).json({
        data: [],
        message: 'Authentication successed'
    })
})

module.exports = router;
