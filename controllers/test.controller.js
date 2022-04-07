
const Test = require('../models/Test')
var XLSX = require('xlsx')
var workbook = XLSX.readFile("mfq_question.xlsx")
var worksheet = workbook.Sheets[workbook.SheetNames[0]]
var fs = require('fs')
var csv = require('fast-csv')
var ws = fs.createWriteStream('test.csv')
// var excel = require('exceljs')
// var wb = new excel.Workbook()
// var sheet = wb.addWorksheet('test')

exports.testController = (req, res, next) => {
    // res.send({ response: "test controller 1" }).status(200);
    Test.findOne({'_id':req.params.id})
    .then(test => res.status(200).json({
        sucess:true,
        data:test
    }))
    .catch(err => res.status(400).json('Error '+err))
}

exports.resultsController = async (req, res, next) => {
    // res.send({ response: "test controller" }).status(200);
    Test.find().sort({'_id':-1})
    .then(test => res.status(200).json({
        sucess:true,
        data:test
    }))
    .catch(err => res.status(400).json('Error ' + err))
}



exports.newTestController = async (req, res, next) => {

    // res.send({response:"test"}).status(200)
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
        // console.log(workbook)
        questions.push({question:question,answer:'None'})
    }
    console.log(questions)
    console.log(name)
    try{
        const test = await Test.create({
            name,            
            questions
        })
    res.send({
        response:test
    }) 
    }catch(err){
        next(err)
    }
}
exports.submitTestController = (req, res, next) => {
    // res.send({ response: "test controller" }).status(200);
    Test.findOne({"_id":req.params.id})
        .then(test => {
            test.set({questions:req.body.question})
            test.save()
                .then(test => res.status(200).json({
                    sucess:true,
                    message:'submit sucess',
                    data:test
                }))
                .catch(err => res.status(400).json('error '+err))
        })
        .catch(err => res.status(400).json('error ' + err))
}

exports.downloadResultController = (req, res, next) => {
        Test.findOne({"_id":req.params.id})
        .then(test => {
            excelArr = [['Questions','Answers']]
            for(i=0;i<test.questions.length;i++){
                excelArr.push([test.questions[i].question,test.questions[i].answer])
            }
            console.log(excelArr)
            // wb.csv.writeFile('test.csv')
            // .then(() => {
            //     var headers = [
            //         {header:'Question',key:'q',width:20},
            //         {header:'Answer',key:'a',width:20}
            //     ]
            //     sheet.columns = headers
            //     sheet.addRow(['a','q'])
            //     sheet.addRow(['v','w'])
            //     sheet.addRow(['d','r'])

            // })
            
            csv.write(excelArr,{headers:true})
            .pipe(ws);   
            res.status(200).json({
                sucess:true,
                data:test.questions
            })      
        })
        .catch(err => res.status(400).json('Error ' + err))
}
