const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    email: String,
    task: String,
    deadline: String,
    done: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel;