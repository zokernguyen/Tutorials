import express from "express";
import cors from "cors";
import decodeToken from "./middlewares/decodeToken.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/todos", decodeToken, (req, res) => {
    console.log(req.headers);
    return res.json({
        todos: [
            {
                title: "Task 1",
            },
            {
                title: "Task 2",
            },
            {
                title: "Task 3",
            },
        ],
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
