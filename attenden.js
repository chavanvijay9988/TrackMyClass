import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudentPage from './components/StudentPage';
import SubjectPage from './components/SubjectPage';
import AttendancePage from './components/AttendancePage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/subjects" element={<SubjectPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to SamsTrack</h1>
      <nav>
        <ul>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/subjects">Subjects</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;

student page js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/student')
      .then(response => setStudents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/student/delete-student/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Students</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentPage;

AttendancePage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState({
    subjectId: '',
    studentIds: [],
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/attendance/add-attendance', attendance)
      .then(response => {
        console.log('Attendance added:', response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Record Attendance</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="subjectId">
          <Form.Label>Subject ID</Form.Label>
          <Form.Control type="text" value={attendance.subjectId} onChange={(e) => setAttendance({ ...attendance, subjectId: e.target.value })} required />
        </Form.Group>

        <Form.Group controlId="studentIds">
          <Form.Label>Student IDs</Form.Label>
          <Form.Control type="text" value={attendance.studentIds} onChange={(e) => setAttendance({ ...attendance, studentIds: e.target.value.split(',') })} required />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={attendance.date} onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} required />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AttendancePage;

API Interaction

axios.get('http://localhost:8080/student')
  .then(response => {
    console.log(response.data); // Handle the response
  })
  .catch(error => {
    console.error(error); // Handle error
  });
