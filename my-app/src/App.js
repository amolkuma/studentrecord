import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Classroom from './classroom';


const App = () => {
  const [students, setStudents] = useState({
    0: { id: 0, name: 'Alice' },
    1: { id: 1, name: 'Bob' },
    2: { id: 2, name: 'Charlie' },
    3: { id: 3, name: 'David' }
  });
  const [classrooms, setClassrooms] = useState({
    0: { id: 0, students: [0, 1] },
    1: { id: 1, students: [2, 3] }
  });

  const addStudent = async student => {
    const response = await fetch('http://localhost:9000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    const newStudent = await response.json();
    setStudents([...students, newStudent]);
  };

  const moveStudent = (studentId, oldIndex, newIndex, classroomId) => {
    const newStudents = [...students];
    const [student] = newStudents.splice(oldIndex, 1);
    newStudents.splice(newIndex, 0, student);
    setStudents(newStudents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        {Object.values(classrooms).map(classroom => (
          <Classroom
            key={classroom.id}
            classroom={classroom}
            students={students}
            addStudent={addStudent}
            moveStudent={moveStudent}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default App;
