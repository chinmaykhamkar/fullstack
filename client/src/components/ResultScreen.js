import React from 'react'
import './ResultScreen.css'
import PublicNav from './publicNav'
import {Link} from 'react-router-dom'
import ResultPage from './ResultPage'

const ResultScreen = () => {

    return (
        <React.Fragment>
            <div className="mainRes">
                <div className="navbar">
                    <PublicNav />
                </div>
                <div className="content">
                    <div className="sideBar">
                        <div className="sideItem">
                        <Link className="link" to="/">Home</Link>
                        </div>
                        <div className="sideItem active">
                            Results
                        </div>
                    </div>
                    <div className="mainContent">
                        <ResultPage />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ResultScreen