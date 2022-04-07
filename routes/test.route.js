const express = require('express')
const router = express.Router()

const {testController,
       resultsController,
       newTestController,
       submitTestController,
       downloadResultController
} = require('../controllers/test.controller')
//page routes 

router.route('/test/:id').get(testController) // done
router.route('/results').get(resultsController) // done


//curd routes 
router.route('/newTest').post(newTestController) //done
router.route('/submitTest/:id').post(submitTestController) //done
router.route('/downloadResult/:id').post(downloadResultController) 

module.exports = router