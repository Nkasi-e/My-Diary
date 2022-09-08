const getEntries = async (req, res) => {
  res.json({ msg: `get users entries` });
};

const postEntries = async (req, res) => {
  res.json({ msg: `Post user entries` });
};

module.exports = {
  getEntries,
  postEntries,
};
