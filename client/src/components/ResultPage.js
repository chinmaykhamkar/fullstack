import React from 'react'
import './ResultPage.css'
import PublicNav from './publicNav'
import {ListGroup} from 'react-bootstrap'
import {Link,Card} from 'react-router-dom'
import Button from '@mui/material/Button';

// import PublicNav from './publicNav'
// import Drawer from './Drawer'

const ResultPage = () => {

    return (
        <React.Fragment>
            <div className="resultMain">
                <div className="card">
                    <div className="quizName">Quiz Name</div>
                    <div className="download">
                        <Button variant="contained">download</Button>
                    </div>
                </div> 
                <div className="card">

                </div> 
                <div className="card">

                </div> 
                <div className="card">

                </div> 
                 
                 
            </div>                   
        </React.Fragment>
    )
}

export default ResultPage