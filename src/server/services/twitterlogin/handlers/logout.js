const handler = (req, res) => {
  req.logout();
  return res.status(200).json({ data: { isAuthenticated: false } });
};

module.exports = handler;
