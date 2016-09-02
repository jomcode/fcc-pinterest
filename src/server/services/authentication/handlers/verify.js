const handleVerify = (req, res) => {
  const user = Object.assign({}, req.user, { isAuthenticated: true });
  return res.status(200).json({ data: user });
};

module.exports = handleVerify;
