const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const polls = require("./routes/polls");
require("dotenv").config();
const app = express();

app.use(express.json());

const URL = process.env.MONGODB_URI;

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err);
    });

app.use("/api/user", users);
app.use("/api/polls", polls);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
