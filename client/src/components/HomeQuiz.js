import React from 'react'
import {  useState, useEffect } from 'react'
import './HomeQuiz.css'
import PublicNav from './publicNav'
import axios from 'axios';
import swal from 'sweetalert'
import {ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// import PublicNav from './publicNav'
// import Drawer from './Drawer'
const que = []
const itr = -1;
const q = []

const HomeQuiz = () => {
    
    
    const[loading,setLoading] = useState(false)
    const[start,setStart] = useState(true)
    const[quiz,setQuiz] = useState(false)
    const [q1, setq1] = React.useState('None');
    const [q2, setq2] = React.useState('None');
    const [q3, setq3] = React.useState('None');
    const [q4, setq4] = React.useState('None');
    const [q5, setq5] = React.useState('None');
    const [q6, setq6] = React.useState('None');
    const [q7, setq7] = React.useState('None');
    const [q8, setq8] = React.useState('None');
    const [q9, setq9] = React.useState('None');
    const [q10, setq10] = React.useState('None');
    
    var s = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]
    var ss = [setq1,setq2,setq3,setq4,setq5,setq6,setq7,setq8,setq9,setq10]
    const RadioInput = ({label, value, checked, setter}) => {
        return (
          <label>
            <input type="radio" checked={checked == value}
                   onChange={() => setter(value)} />
            <span>{label}</span>
          </label>
        );
    };

    // const [gender, setGender] = React.useState();
	// const [role, setRole] = React.useState();
    const handleSubmit = async (e) => {
		e.preventDefault();
		// const data = {gender, role};
        const data = {q1,q2,q3,q4,q5,q6,q7,q8,q9,q10}
        var question = []

        for(let i=0;i<q.length;i++){
            question.push({
                question:q[i].question,
                answer:s[i]
            })
        }
        
        
		// const json = JSON.stringify(question, null, 4);		
		console.log(question);
        try {
            const id = localStorage.getItem("id");
            const da = await axios.get(`http://localhost:5000/test/test/${id}`)
            // console.log(da.data.data.)
            const ti = da.data.data.timestamp
            const te = new Date(`${ti}`)
            const be = te.getMinutes()
            const no = new Date().toISOString()
            const tem = new Date(`${no}`)
            const af = tem.getMinutes()
            const duration = af - be            
            console.log(duration)

            try{
                
                const dat = await axios.post(
                    `http://localhost:5000/test/submitTest/${id}`,
                    {question,duration}
                )
                console.log(dat)
                swal("Confirm Submit")
                .then(() => {
                    setQuiz(false)
                    setStart(true)

                })
            }
            catch(err){
                console.log(err)
            }
        }
        catch(err){
            console.log(err)
        }

	};
    

    const openQuiz = async () => {
        localStorage.clear()
        setStart(false)
        setLoading(true)
        try{
            const surveyData = await axios.post('http://localhost:5000/test/newTest')
            console.log(surveyData.data.response)            
            // id = surveyData.data.response._id
            
            localStorage.setItem("id", surveyData.data.response._id);
            for(let i=0;i<surveyData.data.response.questions.length;i++){
                que.push([surveyData.data.response.questions[i],i])
                q.push(surveyData.data.response.questions[i])
            }
            setTimeout(() => {
                setQuiz(true)
                setLoading(false)
                console.log(que)
            }, 2000);
        }
        catch(err){
            console.log(err)
        }      
    }

    const queList = que.map((t) => {
        // const temp = 'q'+t[1]
        // const temp2 ='setq'+t[1]
        // console.log(temp,temp2)
        
        
        return(
            <div className="formMain">
                    <div key={t[0]._id} className="queName">
                        <label>{t[0].question}</label>
                    </div>
                    <div className="options"> 
                        <RadioInput label="Strongly Disagree" value="Strongly Disagree" checked={s[t[1]]} setter={ss[t[1]]}  />
                        <RadioInput label="Disagree" value="Disagree" checked={s[t[1]]} setter={ss[t[1]]} />
                        <RadioInput label="Slightly Disagree" value="Slightly Disagree" checked={s[t[1]]} setter={ss[t[1]]}  />
                        <RadioInput label="Slightly Agree" value="Slightly Agree" checked={s[t[1]]} setter={ss[t[1]]} />
                        <RadioInput label="Agree" value="Agree" checked={s[t[1]]} setter={ss[t[1]]}  />
                        <RadioInput label="Strongly Agree" value="Strongly Agree" checked={s[t[1]]} setter={ss[t[1]]} />
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

    if(start){
        return (
            <React.Fragment>
                <div className="homeMain">
                    <div className="mainStart">
                        <div className="mainText">
                            MOLA Survey 
                        </div>
                        <div className="mainButton">
                            <Button onClick={openQuiz} variant="contained">New Survey</Button>
                        </div>
                    </div>                
                </div>
            </React.Fragment>
        )
    }
    if(quiz){
        return(
            <React.Fragment>
            <div className="homeQuiz">
                <div className="homeForm">
                
                <form className="homeiForm" onSubmit={handleSubmit}>
                    {queList}
                    
                    <Button style={{width:'10%'}} variant="contained" type="submit">Submit</Button>
                </form>
                    
                </div>
            </div>
        </React.Fragment>   
        )
    }
}

export default HomeQuiz


/**
 * 
 * <FormControl>
                    <div style={{marginBottom:'1rem'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"                    
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Strongly Disagree" control={<Radio />} label="Strongly Disagree" />
                            <FormControlLabel value="Disagree" control={<Radio />} label="Disagree" />
                            <FormControlLabel value="Slightly Disagree" control={<Radio />} label="Slightly Disagree" />
                            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
                            <FormControlLabel value="Slightly Agree" control={<Radio />} label="Slightly Agree" />
                            <FormControlLabel value="Agree" control={<Radio />} label="Agree" />
                            <FormControlLabel value="Strongly Agree" control={<Radio />} label="Strongly Agree" />

                        </RadioGroup>
                    </div>
                    <div style={{marginBottom:'1rem'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"                    
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Strongly Disagree" control={<Radio />} label="Strongly Disagree" />
                            <FormControlLabel value="Disagree" control={<Radio />} label="Disagree" />
                            <FormControlLabel value="Slightly Disagree" control={<Radio />} label="Slightly Disagree" />
                            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
                            <FormControlLabel value="Slightly Agree" control={<Radio />} label="Slightly Agree" />
                            <FormControlLabel value="Agree" control={<Radio />} label="Agree" />
                            <FormControlLabel value="Strongly Agree" control={<Radio />} label="Strongly Agree" />

                        </RadioGroup>
                    </div>
                    <div style={{marginBottom:'1rem'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"                    
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Strongly Disagree" control={<Radio />} label="Strongly Disagree" />
                            <FormControlLabel value="Disagree" control={<Radio />} label="Disagree" />
                            <FormControlLabel value="Slightly Disagree" control={<Radio />} label="Slightly Disagree" />
                            <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
                            <FormControlLabel value="Slightly Agree" control={<Radio />} label="Slightly Agree" />
                            <FormControlLabel value="Agree" control={<Radio />} label="Agree" />
                            <FormControlLabel value="Strongly Agree" control={<Radio />} label="Strongly Agree" />

                        </RadioGroup>
                    </div>
                       <div style={{marginTop:'1rem'}}>
                        <Button variant="contained">submit</Button>                    
                        </div>
                    </FormControl>
 */