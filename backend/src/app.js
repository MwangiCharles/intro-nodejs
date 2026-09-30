import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

// Middleware
app.use(express.json());  // to parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // to parse form data

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter); 

// Test route
app.get('/', (req, res) => {
    res.send('Server is running with MySQL!');
});

export default app;