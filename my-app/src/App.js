import React from "react";
class App extends React.Component {

  state = { students: [], classrooms: [] };

  componentDidMount() {
    fetch('http://localhost:9000/api/students')
      .then(response => response.json())
      .then(data => this.setState({ students: data }))
    fetch('http://localhost:9000/api/classrooms')
      .then(response => response.json())
      .then(data => this.setState({ classrooms: data }))
  }
  onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let students = this.state.students;
    console.log("data", data, status);
    let updated = students.map((student) => {
      if (student.id.toString() === data.toString()) {
        students.status = status;
      }
      return student;
    });
    this.setState({ students: updated });
  };

  render() {
    const { students } = this.state;
    const { classrooms } = this.state.classrooms;
    console.log("students", students);
    console.log("classrooms", classrooms);

    return (
      <div className="container">
        <div
          className="order small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, false, "New Order to move student")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Students</h4>
                  <button style={{ width: "100%" }}>+</button>
                  {students.map((student) => (
                    <div
                      className="card"
                      key={student.id}
                      id={student.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="pending small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, false, "Assign class to a student")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Class Rooms</h4>
                  <button style={{ width: "100%" }}>+</button>
                  {classrooms.map((student) => (
                    <div
                      className="card"
                      key={student.id}
                      id={student.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        <img src={student.image} alt="box" />
                      </div>
                      <div className="card_right">
                        <div className="status">{student.status}</div>
                        <div className="days">{student.time}</div>
                        <div className="time">{student.days}</div>
                      </div>

                    </div>

                  ))}

                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="done small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, true, "Final List of StudentsWithClassroom")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Students with ClassRooms</h4>
                  <button style={{ width: "100%" }}>+</button>
                  {done.map((list) => (
                    <div
                      className="card"
                      key={list.classroomid}
                      id={list.classroomid}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
