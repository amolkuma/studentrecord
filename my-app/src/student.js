import React from 'react';
import { useDrag } from 'react-dnd';

const Student = ({ student, index, classroomId, moveStudent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'STUDENT',
    item: {student, index, classroomId },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { index: newIndex } = monitor.getItem();
      const { index: dropIndex } = dropResult;
      if (newIndex !== dropIndex) {
        moveStudent(student.id, newIndex, dropIndex, classroomId);
      }
    }
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {student.name}
    </div>
  );
};

export default Student;

