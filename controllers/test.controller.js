
const Test = require('../models/Test')
var XLSX = require('xlsx')
var workbook = XLSX.readFile("mfq_question.xlsx")
var worksheet = workbook.Sheets[workbook.SheetNames[0]]


exports.testController = (req, res, next) => {
    res.send({ response: "test controller 1" }).status(200);
}

exports.resultsController = (req, res, next) => {
    res.send({ response: "test controller" }).status(200);
}
exports.newTestController = async (req, res, next) => {

    res.send({response:"test"}).status(200)
    // res.send({ response: "test controller" }).status(200);
    var temp = Date.now()%10
    var temp2 = Date.now()%100
    var name = `test${temp}${temp2}`
    index = []
    questions = []
    for(i=1;i<=10;i++){        
        index.push(Math.floor(Math.random() * (37 - 2 + 1) + 2))
    }
    console.log(index)
    for(i=0;i<index.length;i++){
        question = worksheet[`B${index[i]}`].v
        // console.log(question)
        questions.push({question:question,answer:'None'})
    }
    console.log(questions)
    console.log(name)
    try{
        const test = await Test.create({
            name,            
            questions
        })
    }catch(err){
        next(err)
    }
}
exports.submitTestController = (req, res, next) => {
    res.send({ response: "test controller" }).status(200);
}

exports.downloadResultController = (req, res, next) => {
    res.send({ response: "test controller" }).status(200);
}
