require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}

));

// Load all routes
require("./src/routes")(app);

// Sync DB
const sequelize = require('./src/config/database');
sequelize.sync({ alter : true })
.then(() => console.log("DB Sync Success"))
.catch(err => console.log(err));

// Start Server
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
