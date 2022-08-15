const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Instructor Routes
app.use("/api/instructor/auth", require("./routes/instructor/auth/auth"));
app.use("/api/instructor/course", require("./routes/instructor/course/course"));
app.use("/api/instructor/course/assignment", require("./routes/instructor/course/assignment/assignment"));
app.use("/api/instructor/course/assignment/submission", require("./routes/instructor/course/assignment/submission/submission"));

// Student Routes
app.use("/api/student/auth", require("./routes/student/auth/auth"));
app.use("/api/student/course", require("./routes/student/course/course"));
app.use("/api/student/course/assignment", require("./routes/student/course/assignment/assignment"));
app.use("/api/student/course/assignment/submission", require("./routes/student/course/assignment/submission/submission"));


app.get("/", (req, res) => {
    res.send("Konduct App backend listening here");
})

app.listen(port, () => {
    console.log(`Konduct app listening at https://localhost:${port}`);
})