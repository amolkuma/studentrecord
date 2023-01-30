import React, { useEffect, useState } from 'react';

export default function Classrooms() {
  const [classrooms, listClassrooms] = useState([]);

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: 'test' })
    // };
    fetch('http://localhost:9000/api/classrooms')
      .then(response => response.json())
      .then(data => listClassrooms(data));        
  }, []);
  return (    
    <div>{classrooms.map(classroom => <div>{classroom.name}</div>)}</div >
  );

}

