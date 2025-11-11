const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json()); // to parse JSON body

// File where todos are stored
const FILE_PATH = "./todos.json";

// ✅ Helper: Read data from file
function readTodos() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

// ✅ Helper: Write data to file
function writeTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
}

// ✅ Route: Get all todos
app.get("/todos", function(req, res) {
    const todos = readTodos();
    res.send(todos);
});

// ✅ Route: Add a new todo
app.post("/todos", function(req, res) {
    const todos = readTodos();
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.send({ message: "Todo added", todo: newTodo });
});

// ✅ Route: Mark todo as completed
app.put("/todos/:id", function(req, res) {
    const todos = readTodos();
    const id = Number(req.params.id);

    const updated = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: true };
        }
        return todo;
    });

    writeTodos(updated);
    res.send({ message: "Todo marked as completed" });
});

// ✅ Route: Delete a todo
app.delete("/todos/:id", function(req, res) {
    const todos = readTodos();
    const id = Number(req.params.id);

    const filtered = todos.filter(todo => todo.id !== id);

    writeTodos(filtered);
    res.send({ message: "Todo deleted" });
});

// ✅ Home route
app.get("/", function(req, res) {
    res.send("Todo App Backend Running...");
});
app.listen(3000)