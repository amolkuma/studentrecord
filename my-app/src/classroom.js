import React from 'react';
import { useDrop } from 'react-dnd';
import Student from './student';

const Classroom = ({ classroom, students, addStudent, moveStudent }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'student',
    drop: item => {
      addStudent(item.id, classroom.id);
      return { classroomId: classroom.id, index: classroom.students.length };
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;
  const backgroundColor = isActive ? 'lightgreen' : 'white';

  return (
    <div ref={drop} style={{ backgroundColor }}>
      <h2>Classroom {classroom.id}</h2>
      {classroom.students.map((studentId, index) => (
        <Student key={studentId} student={students[studentId]} index={index} moveStudent={moveStudent} />
      ))}
    </div>
  );
};

export default Classroom;
