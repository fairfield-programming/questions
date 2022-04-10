module.exports = (req, res) => {

    if (req.params.id == undefined) return res.status(400).json({ error: "Not All Parameters Provided." });

    Question.findAll({
        attributes: [
            { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('Comment.questionId')), 'comments']] 
            },
            { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('Answer.questionId')), 'answers']] 
            }
        ],
        include: [{
            model: Comment, attributes: []
        }, {
            model: Answer, attributes: []
        }],
        group: ['Comment.questionId', 'Answer.questionId'],
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