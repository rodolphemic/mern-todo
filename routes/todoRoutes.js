const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// POST a new todo
router.post('/todos', async (req, res) => {

  console.log('Route POST atteinte'); // Si tu vois cela, la route fonctionne

  const newTodo = new Todo({
    text: req.body.text,
  });

  try {
    await newTodo.save();
    res.json('Todo added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
