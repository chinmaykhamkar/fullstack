import logo from './logo.svg';
import './index.css';
import {BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import MainScreen from './components/MainScreen'
import ResultScreen from './components/ResultScreen'
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<MainScreen />} />
          <Route exact path="/results" element={<ResultScreen />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
