exports.dashboard = (req, res) => {
  res.json({
    message: "Welcome to Chat Dashboard",
    user: req.user
  });
};
