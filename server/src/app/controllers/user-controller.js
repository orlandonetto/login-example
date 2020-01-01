const service = require('../services/user-service');

module.exports = {
    async save(req, res) {
        const user = req.body;

        await service.save(user)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async auth(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        await service.auth(username, password)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
    async findAll(req, res) {
        await service.findAll()
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    },
};
