import React, { useState, useCallback } from "react";

// Todo - accept a prop called onSave as a prop of a component
// onClick of button - call that prop with name and id, set name and id to default values

export default function NewStudent() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const nameChangeHandler = useCallback(e => setName(e.target.value), []);
  const idChangeHandler = useCallback(e => setId(e.target.value), []);

  return (
    <div>
      <h2>New Student</h2>
      <div>
        <label>name: </label>
        <input value={name} onChange={nameChangeHandler} />
      </div>
      <div>
        <label>id: </label>
        <input value={id} onChange={idChangeHandler} />
      </div>
      <br />
      <button>Save</button>
    </div>
  );
}
