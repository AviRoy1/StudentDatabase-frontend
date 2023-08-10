import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import LoginPage from './Pages/LoginPage';
import Database from './Pages/Admin/Database';
import Attendence from './Pages/Admin/Attendence';
import { useDispatch, useSelector } from 'react-redux';
import StudentProfile from './Pages/Student/StudentProfile';
import { myProfile } from './Redux/Actions/StudentAction';
import PreLoader from './components/layout/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const { student, accessToken, loading } = useSelector(state => state.student);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/database" element={<Database />} />
        <Route path="/attendance" element={<Attendence />} />

        {loading ? (
          <Route path="/loading" element={<PreLoader />} />
        ) : (
          <Route
            path="/profile"
            element={
              <StudentProfile student={student} accessToken={accessToken} />
            }
          />
        )}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
