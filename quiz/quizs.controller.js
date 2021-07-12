const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const quizService = require('../quiz/quiz.service');
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
    quizService.create(req.body)

    res.status(201).json({
        data: [],
        message: 'Authentication success'
    })
})



router.get('/quiz/:id', async (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to get a quiz' */

    console.log(req.params)

    var data = await quizService.getById(req.params.id)

    res.status(201).json({
        data: data,
        message: 'Authentication success'
    })
})


router.get('/quiz-matchup/:id', async (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to get a matchup of 2 items' */
    try{
        var data = await quizService.getMatchup(req.params.id)

        res.status(201).json({
            matchup: data,
        })
    }catch(err){
        res.status(500).json({
            error: err,
        })
    }
})
router.post('/quiz-vote', async (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to vote on a matchup' */
    /*	#swagger.parameters['quiz'] = {
        in: 'body',
        description: 'Quiz and item Ids.',
        required: true,
        schema: { $ref: "#/definitions/QuizItemIds" }
    } */
    try{
        await quizService.recordVote(req.body.quizId, req.body.itemId)

        res.status(201).json({
            result: "sucess"
        })
    }catch(err){
        console.log(err,"haha")
        res.status(500).json({
            error: err.toString(),
        })
    }
})

router.get('/quiz-all', async (req, res, next) => {
    /* 	#swagger.tags = ['Quiz']
        #swagger.description = 'Endpoint to get all quiz' */

    console.log(req.params)
    var data = await quizService.getAll(req.params)

    res.status(201).json({
        data: data,
        message: 'Authentication success'
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
