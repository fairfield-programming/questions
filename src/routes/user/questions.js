module.exports = (req, res) => {

    if (req.params.id == undefined) return res.status(400).json({ error: "Not All Parameters Provided." });

    Question.findAll({
        attributes: [
            { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('Comment.id')), 'comments']] 
            },
            { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('Answer.id')), 'answers']] 
            }
        ],
        include: [{
            model: Comment
        }, {
            model: Answer
        }],
        group: ['Comment.id', 'Answer.id'],
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