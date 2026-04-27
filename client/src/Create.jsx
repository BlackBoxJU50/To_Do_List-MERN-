import React, { useState } from "react";
import axios from "axios";

function Create() {
    const [task, setTask] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleAdd = () => {
        if (!task) return;
        const email = localStorage.getItem("email");
        axios.post("http://localhost:3000/add", { task: task, deadline: deadline, email: email })
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="card shadow-sm border-0 p-3 bg-white" style={{ borderRadius: '15px' }}>
            <div className="d-flex flex-column gap-2">
                <input
                    type="text"
                    className="form-control border-0 bg-light py-2 px-3"
                    placeholder="Enter a task..."
                    style={{ borderRadius: '10px', fontSize: '1.1rem' }}
                    onChange={(e) => setTask(e.target.value)}
                />
                <div className="d-flex gap-2">
                    <input 
                        type="date" 
                        className="form-control border-0 bg-light"
                        style={{ borderRadius: '10px' }}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary px-4 fw-bold shadow-sm"
                        style={{ borderRadius: '10px', backgroundColor: '#0056b3' }}
                        onClick={handleAdd}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Create;