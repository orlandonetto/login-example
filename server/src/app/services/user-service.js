const User = require('../models/user');
const bcrypt = require('bcryptjs');
const tokenService = require('./tokenService');

module.exports = {
    async save(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await User.create(user);
                resolve(response);
            } catch (e) {
                reject({ok: false, message: e.message});
            }
        });
    },
    async auth(username = "", password = "") {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({username}, {password: 1});

                if (user === null)
                    return reject({ok: false, message: "Fail to authenticate, because username not found."});

                bcrypt.compare(password, user.password)
                    .then(async res => {

                        if (!res)
                            return reject({ok: false, message: "Fail to authenticate, because password is wrong."});

                        const userResponse = await User.findOne({username});
                        const token = await tokenService.generate(userResponse._id);
                        resolve({
                            ok: true,
                            message: "Authentication success.",
                            token: token,
                            user: userResponse
                        })
                    })
                    .catch(err => {
                        reject({ok: false, message: "Fail to authenticate, error: " + err.message});
                        console.log(err.message)
                    });
            } catch (e) {
                reject({ok: false, message: e.message});
            }
        });
    },
    async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.find();
                resolve(user);
            } catch (e) {
                reject({ok: false, message: e.message});
            }
        });
    },
};
