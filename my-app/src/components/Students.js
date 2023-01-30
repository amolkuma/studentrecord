import React, { useEffect, useState } from 'react';

export default function Students() {
  const [students, listStudents] = useState([]);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: 'test' })
    // };
    fetch('http://localhost:9000/api/students')
      .then(response => response.json())
      .then(data => listStudents(data));        
  }, []);
  return (    
    <div>{students.map(student => <div key={student.id} >{student.name}</div>)}</div >
  );

}

