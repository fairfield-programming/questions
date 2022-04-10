module.exports = (req, res) => {

    if (req.params.id == undefined) return res.status(400).json({ error: "Not All Parameters Provided." });

    Question.findAll({
        include: [{ as: 'Answer', model: Answer, attributes: [], /* required: true, duplicating: false */ }],
        attributes: [ 'id', 'title', 'body', 'user', [sequelize.fn('count', sequelize.col('Answer.id')), 'total'] ],
        group: ['Question.id'],

        where: {
            user: req.params.id
        }
    }).then(function (data) {

        return res.status(200).json(data);

    }).catch(function (error) {

        console.log(error);
        return res.status(500).json({ error: "Internal Server Error." });

    });

};