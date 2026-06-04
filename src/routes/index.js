const authRoutes = require("./auth");
const chatRoutes = require("./chat");
const adminRoutes = require("./admin");




module.exports = function (app) {
    app.use("/api/auth", authRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/admin", adminRoutes);
};
