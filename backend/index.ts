import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const TODOS = [
    { id: 1, title: "Learn Kubernetes", completed: false },
    { id: 2, title: "Build a React App", completed: true },
];

app.get("/", (req:any, res:any) => {
    res.send("Hello, from the kubernetes pod!");
});

app.get("/api/todos", (req:any, res:any) => {
    res.json(TODOS);
});

app.post("/api/todos", (req:any, res:any) => {
    const { title } = req.body; 
    const newTodo = { id: Date.now(), title, completed: false };
    TODOS.push(newTodo);
    res.status(201).json(newTodo);
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});