import React from 'react'
import {  useState, useEffect } from 'react'
import './ResultPage.css'
import axios from 'axios';
import PublicNav from './publicNav'
import {ListGroup} from 'react-bootstrap'
import {Link,Card} from 'react-router-dom'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { CSVLink, CSVDownload } from "react-csv";
let test = []
let finalData = []
const ResultPage = () => {

    const [loading,setLoading] = useState(true)
    useEffect(() => {
        testData();
    },[]);

    const testData = async () => {
        try{
            const tdata = await axios.get('http://localhost:5000/test/results');
            console.log(tdata.data.data)
            
                
                for(let i=0;i<tdata.data.data.length;i++){
                    test.push(tdata.data.data[i])
                    // finalData.push(tdata.data.data[i].questions)
                }
                // for(let i=0;i<test.length/2;i++){
                //     finalTest.push(test[i])
                // }
                // console.log(finalData)
                setLoading(false)
                
    
                     
            
        }
        catch(err){
            console.log(err)
        }
    }
    console.log(test)

    // const downloadCsv = async (testid) => {
    //     // console.log(testid);
    //     const excelArr = [['Question','Answer']]
    //     try{
    //         const csvData = await axios.post(`http://localhost:5000/test/downloadResult/${testid}`);
    //         console.log(csvData.data.data.length)
    //         for(let i=0;i<csvData.data.data.length;i++){
    //             // console.log(csvData.data.data[i])
    //             excelArr.push([csvData.data.data[i].question,csvData.data.data[i].answer])
    //         }
    //         finalData = excelArr
    //         // console.log(finalData)  
    //         // setSheet(finalData)          
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }

    const testList = test.map((t) => {
        // console.log(t.duration)
        const d = new Date(`${t.duration}`)
        // console.log(d.getMinutes())
        const dur = d.getMinutes();
        if(dur == 0){
            dur = 1;
        }
        const finalArr = [['Question','Answer']]
        for(let i=0;i<t.questions.length;i++){
            finalArr.push([t.questions[i].question,t.questions[i].answer])
        }
        // console.log(finalArr)
        return(
        <div key={t._id} className="card">
            <div className="cardFrist">
                <div className="quizName">{t.name}</div>
                <div className="quizDuration">Duration : {dur} mins</div>
            </div>
            <div className="download">   
                {/* <CSVLink data={finalArr}>
                    download
                </CSVLink>             */}
                <Button variant="contained">
                    <CSVLink style={{color:'white',textDecoration:'none'}} data={finalArr}>
                        download
                    </CSVLink> 
                </Button>
            </div>
        </div>
        )
    })

    if(loading){
        return(
            <div className="loading">
                <CircularProgress />
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="resultMain">
                {testList}
                {/* <div className="card">
                    <div className="cardFrist">
                        <div className="quizName">Quiz Name</div>
                        <div className="quizDuration">Duration : 30mins</div>
                    </div>
                    <div className="download">
                        <Button variant="contained">download</Button>
                    </div>
                </div>  */}
                
                 
                 
            </div>                   
        </React.Fragment>
    )
}

export default ResultPage