const express = require('express')
const router = express.Router()

const {testController,
       resultsController,
       newTestController,
       submitTestController,
       downloadResultController
} = require('../controllers/test.controller')
//page routes 

router.route('/test').get(testController)
router.route('/results').get(resultsController)

//curd routes 
router.route('/newTest').post(newTestController)
router.route('/submitTest').post(submitTestController)
router.route('/downloadResult/:id').post(downloadResultController)

module.exports = router