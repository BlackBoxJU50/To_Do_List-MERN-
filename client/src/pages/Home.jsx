import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Create from "../components/Create";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill, BsPencilSquare, BsCheckLg, BsXLg } from 'react-icons/bs';

function Home() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(-1);
    const [editText, setEditText] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        window.location.reload();
    };

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = () => {
        const email = localStorage.getItem("email");
        axios.get('/get/' + email)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }

    const handleEditStatus = (id) => {
        axios.put('/update/' + id)
            .then(result => {
                fetchTodos();
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('/delete/' + id)
            .then(result => {
                fetchTodos();
            })
            .catch(err => console.log(err))
    }

    const startEdit = (id, task) => {
        setEditId(id);
        setEditText(task);
    }

    const handleSave = (id) => {
        if (!editText) return;
        axios.put('/edit/' + id, { task: editText })
            .then(result => {
                setEditId(-1);
                fetchTodos();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <h1 className="fw-bold text-primary">My To Do List</h1>
                <div className="d-flex align-items-center gap-3">
                    <span className="fw-semibold text-secondary text-uppercase small"> {localStorage.getItem("name")}</span>
                    <button className="btn btn-outline-danger fw-bold shadow-sm" onClick={handleLogout} style={{ borderRadius: '10px' }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <Create />
                    <div className="mt-4">
                        {todos.length === 0 ? (
                            <div className="text-center py-5 bg-white rounded shadow-sm border border-dashed">
                                <h3 className="text-muted">No Tasks Yet</h3>
                                <p className="text-secondary">Type a task above and click 'Add' to begin!</p>
                            </div>
                        ) : (
                            todos.map((todo) => (
                                <div key={todo._id} className="card mb-3 shadow-sm border-0 bg-white hover-shadow transition">
                                    <div className="card-body p-3 d-flex align-items-center justify-content-between">

                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div onClick={() => handleEditStatus(todo._id)} style={{ cursor: 'pointer' }}>
                                                {todo.done ?
                                                    <BsFillCheckCircleFill className="text-success fs-4 me-3" /> :
                                                    <BsCircleFill className="text-secondary opacity-25 fs-4 me-3" />
                                                }
                                            </div>

                                            {editId === todo._id ? (
                                                <input
                                                    type="text"
                                                    className="form-control border-primary py-1"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className={`fs-5 ${todo.done ? "text-decoration-line-through text-muted" : ""}`}>
                                                    {todo.task}
                                                </span>
                                            )}
                                        </div>

                                        <div className="d-flex align-items-center gap-3 ms-3">
                                            {editId === todo._id ? (
                                                <>
                                                    <BsCheckLg className="text-success fs-5 pointer" onClick={() => handleSave(todo._id)} />
                                                    <BsXLg className="text-danger fs-5 pointer" onClick={() => setEditId(-1)} />
                                                </>
                                            ) : (
                                                <>
                                                    <BsPencilSquare className="text-primary fs-5 pointer" onClick={() => startEdit(todo._id, todo.task)} />
                                                    <BsFillTrashFill className="text-danger fs-5 pointer" onClick={() => handleDelete(todo._id)} />
                                                </>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;