const express = require('express');
const env = require('dotenv').config();
const app = express();
const fs=require("fs");
const clc=require("cli-color");
const path=require("path");
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
// console.log(clc.yellowBright.bold("[INFO] Installing Plugins... Please wait."));
// let moduleFiles = fs.readdirSync((0, path.join)(__dirname, './')).filter((file) => file.endsWith('.js'));
// for (let file of moduleFiles) {
//     try {
//         const command = require((0, path.join)(__dirname, './', `${file}`));
//         console.log(clc.magentaBright("[INFO] Successfully imported module"), clc.cyanBright.bold(`${file}`));
//         commandHandler.set(command.name, command);
//     }
//     catch (error) {
//         console.log(clc.blueBright.bold("[INFO] Could not import module"), clc.redBright.bold(`${file}`));
//         console.log(`[ERROR] `, error);
//         continue;
//     }
// }

// console.log(clc.green.bold("[INFO] Plugins Installed Successfully. The app is ready to use."));
app.listen(port, () => {
    console.log(clc.redBright.bold(`Server is running on port ` + port));
});