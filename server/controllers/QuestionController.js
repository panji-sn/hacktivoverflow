const Question = require("../models/Question")
const Answer = require("../models/Answer")
const Tag = require('../models/Tag')

class QuestionController {
    static create (req, res, next) {
        let { title, description, tags } = req.body
        let UserId = req.loggedUser.id
        let temp
        let tagTemp
        Question.create({
            title,
            description,
            tags,
            UserId,
            upVotes: [],
            downVotes: [],
            answer: []
        })
        .then ((result) => {
            temp = result
            async function test () {
                for (let i = 0; i < tags.length; i++) {
                    tagTemp = tags[i]
                    await Tag.findOne({
                        tag: tags[i]
                    })
                        .then (async result => {
                            if (result) {
                                console.log('masuk if')
                                return result
                            }
                            else {
                                console.log('masuk else')
                                return Tag.create({
                                    tag: tagTemp
                                })
                            } 
                        })
                }
            }
            return test()
        })
        .then (() => {
            res.status(201).json(temp)
        })
        .catch (next)
    }

    static findAllQuestion (req, res, next) {
        let arrTemp
        Question.find()
        .populate('UserId')
        .then (result => {
            // async function tes () {
            //     for (let i = 0; i < result.length; i++) {
            //         console.log('masuk', result[i]._id)
            //         Answer.find({
            //             QuestionId: result[i]._id
            //         })
            //         .then (data => {
            //             console.log(data)
            //             result[i].hasil = data
            //         })
            //     }
            // }
            // arrTemp = result
            // console.log('sebelum return', arrTemp)
            // return tes()
            res.status(200).json(result)
        })
        // .then (data => {
        //     // console.log(data.data)
        //     res.status(200).json(arrTemp)
        // })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        Question.find({
            UserId: req.loggedUser.id
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateQuestion (req, res, next) {
        let { title, description} = req.body
        let { id } = req.params
        Question.findOneAndUpdate({
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

    static deleteQuestion (req, res, next) {
        let { id } = req.params
        Question.findOneAndDelete({
            _id: id
        })
        .then ((result) => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static upVotes (req, res, next) {
        let { UserId, _id } = req.body
        let temp = false
        Question.findOne({_id})
        .then (result => {
            for (let i = 0; i < result.upVotes.length; i++) {
                if (UserId == result.upVotes[i]) temp = true
            }

            if (temp) {
                return Question.findByIdAndUpdate(_id, { $pull: { upVotes: UserId}}, { new: true })
            } else {
                return Question.findByIdAndUpdate(_id, { $push: { upVotes: UserId}}, { new: true })
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
        Question.findOne({_id})
            .then (result => {
                for (let i = 0; i < result.downVotes.length; i++) {
                    if (UserId == result.downVotes[i]) temp = true
                }
    
                if (temp) {
                    return Question.findByIdAndUpdate(_id, { $pull: { downVotes: UserId}}, { new: true })
                } else {
                    return Question.findByIdAndUpdate(_id, { $push: { downVotes: UserId}}, { new: true })
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
        console.log(id)
        let temp
        Question.findOne({
            _id: id
        })
        .populate('UserId')
        .then (result => {
            console.log(result)
            temp = result
            return Answer.find({
                QuestionId: id
            }).populate('UserId')
        })
        .then (result => {
            console.log(temp.UserId.name)
            res.status(200).json({
                _id: temp._id,
                UserId: temp.UserId,
                title: temp.title,
                description: temp.description,
                hasil: result,
                upVotes: temp.upVotes,
                downVotes: temp.downVotes
            })
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = QuestionController