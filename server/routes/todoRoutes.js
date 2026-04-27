const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post('/add', todoController.addTodo);
router.get('/get/:email', todoController.getTodos);
router.put('/update/:id', todoController.updateTodoStatus);
router.delete('/delete/:id', todoController.deleteTodo);
router.put('/edit/:id', todoController.editTodo);

module.exports = router;
