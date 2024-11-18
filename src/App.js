import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './screens/Home';
import GroupsPage from './pages/GroupsPage';
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
    return (
        <Router>
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/groups" element={<GroupsPage />} />
            </Routes>
           </ErrorBoundary>
        </Router>
    );
};

export default App;