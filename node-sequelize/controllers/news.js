const News = require('../models').News;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

module.exports = {
    findAll(req, res) {
        const { page, size, title } = req.query;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        const { limit, offset } = getPagination(page, size);

        News.findAndCountAll({ where: condition, limit, offset })
            .then(data => {
                const response = getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    },
    list(req, res) {
        return News
            .findAll({
                include: ['createdAt', 'DESC']
            })
            .then((news) => res.status(200).send(news))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return News
            .findByPk(req.params.id,)
            .then((news) => {
                if (!news) {
                    return res.status(404).send({
                        message: 'News Not Found',
                    });
                }
                return res.status(200).send(news);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },

    add(req, res) {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        };
        return News
            .create({
                news_title: req.body.title,
                news_text: req.body.text,
            })
            .then((news) => res.status(201).send(news))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return News
            .findByPk(req.params.id,)
            .then(news => {
                if (!news) {
                    return res.status(404).send({
                        message: 'News Not Found',
                    });
                }
                return news
                    .update({
                        news_title: req.body.title || news.news_title,
                    })
                    .then(() => res.status(200).send(news))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return News
            .findByPk(req.params.id)
            .then(news => {
                if (!news) {
                    return res.status(400).send({
                        message: 'News Not Found',
                    });
                }
                return news
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};