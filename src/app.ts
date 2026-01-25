import express from "express";
import initDB from "./config/db";

const app = express();

// middleware
app.use(express.json());


initDB();

app.get("/", (req, res) => {
    res.send("Server is running");
});

export default app;
