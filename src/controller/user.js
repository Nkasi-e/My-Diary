const { database } = require("../db/database");

const getEntries = async (req, res) => {
  const user = database.user;

  res.json({ user, nbHit: user.length });
};

const postEntries = async (req, res) => {
  const { name, email, password } = req.body;
  database.user.push({
    name,
    email,
    password,
    date: new Date(),
  });
  res.json(database.user[database.user.length - 1]);
};

module.exports = {
  getEntries,
  postEntries,
};
