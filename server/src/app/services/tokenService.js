const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = {
    generate(data) {
        return jwt.sign({
            data: data
        }, secret, {expiresIn: '10h'});
    },
    verify(token) {
        return new Promise((resolve, reject) => {
            try {
                const decoded = jwt.verify(token, secret);

                resolve({ok: true, data: decoded.data})
            } catch (err) {
                reject({ok: false, message: err.message});
            }
        })
    }
};
