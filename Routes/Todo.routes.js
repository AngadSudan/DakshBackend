const express= require("express");
const {HandleTodo, getTodo, updateTodo, deleteTodo}= require('../Controllers/HandleTodo.controller')
const Todo= express.Router();

Todo.get("/:userid",getTodo)
Todo.post('/',HandleTodo);
Todo.delete('/:userid/:id',deleteTodo)
Todo.patch('/',updateTodo);
module.exports={
    Todo
}