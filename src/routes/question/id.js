module.exports = (req, res) => {

    if (req.params.id == undefined) return res.status(400).json({ error: "Not All Parameters Provided." });

    Question.findOne({
        where: {
            id: req.params.id
        },
        include: Answer
    }).then(function (data) {

        if (data == null) return res.status(404).json({ error: "Question Not Found." });
        
        return res.status(200).json(data);

        // data.getAnswers().then(function (answers) {

        //     return res.status(200).json({ ...data.dataValues, answers });

        // }).catch(function (error) {

        //     console.log(error);
        //     return res.status(500).json({ error: "Internal Server Error." });

        // });

    }).catch(function (error) {

        console.log(error);
        return res.status(500).json({ error: "Internal Server Error." });

    });

};