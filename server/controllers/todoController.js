const TodoModel = require("../models/Todo");

exports.addTodo = (req, res) => {
    const { task, email } = req.body;
    TodoModel.create({ task: task, email: email })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.getTodos = (req, res) => {
    const { email } = req.params;
    TodoModel.find({ email: email })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.updateTodoStatus = (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

exports.editTodo = (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};
