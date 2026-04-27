const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const app = express();
const TodoModel = require("./models/Todo");

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://ahmedhasib2224_db_user2:DDITvJNbLKmb6mgV@cluster0.pchryyh.mongodb.net/employee?appName=Cluster0", {
    tlsAllowInvalidCertificates: true
})

app.post('/add', (req, res) => {
    const { task, email } = req.body;
    TodoModel.create({ task: task, email: email })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/get/:email', (req, res) => {
    const { email } = req.params;
    TodoModel.find({ email: email })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    res.json({ status: "Success", name: user.name })
                }
                else {
                    res.json("Password not match")
                }
            }
            else {
                res.json("User not found")
            }
        })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))


})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})