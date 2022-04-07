import React from 'react'
import './MainScreen.css'
import PublicNav from './publicNav'
import {ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import HomeQuiz from './HomeQuiz'

// import PublicNav from './publicNav'
// import Drawer from './Drawer'

const MainScreen = () => {

    return (
        <React.Fragment>
            <div className="main">
                <div className="navbar">
                    <PublicNav />
                </div>
                <div className="content">
                    <div className="sideBar">
                        <div className="sideItem active">
                            Home
                        </div>
                        <div className="sideItem">
                            <Link className="link" to="/results">Results</Link>
                        </div>
                    </div>
                    <div className="mainContent">
                        <HomeQuiz />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainScreen