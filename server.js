const express = require('express');
const env = require('dotenv').config();
const app = express();
require('./db');
const port = process.env.PORT || 3000;
app.use(express.json());
const user = require("./routes/user");
const article = require("./routes/article");
app.use("/api", user);
app.use("/api", article);
app.get("/", (req, res) => {
    console.log("Hello from Server.js");
    res.send("Hello from server.js");
});
app.all('*', (req, res) => {
    res.status(404).json({
        message: 'Given route does not exist available routes are {/api/login}-post req {/api/signup}post req {/api/hello}get req {/}get req {api/users/:userId/articles}post req  {api/articles}get req {api/users/:userId}put req'
    })
})
app.listen(port, () => {
    console.log(`Server is running on port ` + port);
});