const Answer = require("../models/Answer")
const Question = require("../models/Question")

class AnswerController {
    static create (req, res, next) {
        let { title, description, QuestionId } = req.body
        let UserId = req.loggedUser.id
        let temp
        Answer.create({
            title,
            description,
            UserId,
            QuestionId
        })
        .then ( (result) => {
            temp = result
            return Question.findByIdAndUpdate(QuestionId, {$push: {
                answer: temp._id
            }})
        })
        .then (() => {
            res.status(201).json(temp)
        })
        .catch (next)
    }

    static findAll (req, res, next) {
        let { id } = req.body
        Answer.find({
            QuestionId: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateAnswer (req, res, next) {
        let { title, description } = req.body
        let { id } = req.params
        Answer.findOneAndUpdate({
            _id : id
        }, {
            title,
            description
        })
        .then ( (result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteAnswer (req, res, next) {
        let { id, QuestionId } = req.params
        let temp
        let arrTemp = []
        Answer.findOneAndDelete({
            _id: id
        })
        .then (result => {
            temp = result
            console.log('masuk sini', id, QuestionId)
            return Question.findById(QuestionId)
        })
        .then (result => {
            for (let i = 0; i < result.answer.length; i++) {
                if (result.answer[i] != id) arrTemp.push(result.answer[i])
            }

            return Question.findByIdAndUpdate(QuestionId, {
                $set: {
                    answer: arrTemp
                }
            }, { new: true})
        })
        .then ((result) => {
            console.log('bisa disini', result)
            res.status(200).json(temp)
        })
        .catch (err => {
            next(err)
        })
    }

    static upVotes (req, res, next) {
        let { UserId, _id } = req.body
        let temp = false
        Answer.findOne({_id})
            .then (result => {
                for (let i = 0; i < result.upVotes.length; i++) {
                    if (UserId == result.upVotes[i]) temp = true
                }
    
                if (temp) {
                    return Answer.findByIdAndUpdate(_id, { $pull: { upVotes: UserId}}, { new: true })
                } else {
                    return Answer.findByIdAndUpdate(_id, { $push: { upVotes: UserId}}, { new: true })
                }
            })
            .then (data => {
                res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
            })
            .catch (err => {
                next(err)
            })
    }

    static downVotes (req, res, next) {
        let { UserId, _id } = req.body
        let temp = false
        Answer.findOne({_id})
            .then (result => {
                for (let i = 0; i < result.downVotes.length; i++) {
                    if (UserId == result.downVotes[i]) temp = true
                }

                if (temp) {
                    return Answer.findByIdAndUpdate(_id, { $pull: { downVotes: UserId}}, { new: true })
                } else {
                    return Answer.findByIdAndUpdate(_id, { $push: { downVotes: UserId}}, { new: true })
                }
            })
            .then (data => {
                res.status(200).json({upVotes: data.upVotes, downVotes: data.downVotes})
            })
            .catch (err => {
                next(err)
            })
    }

    static findOne (req, res, next) {
        let { id } = req.params
        Answer.findOne({
            _id: id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = AnswerController