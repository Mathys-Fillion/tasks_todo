const notFound = (req, res, next) => {
    res.status(404).json({ "msg" : "Not found" });
};

module.exports = notFound;
