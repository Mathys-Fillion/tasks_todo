module.exports = (req, res, next) => {
    if (!req.headers.cookie) return next();  
    const token = req.headers.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    if (token) {
        req.token = token;
    }  
    next();
};
