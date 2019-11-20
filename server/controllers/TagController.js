const Tag = require('../models/Tag')
const User = require('../models/User')

class TagController {
    static findAll (req, res, next) {
        Tag.find()
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateTag (req, res, next) {
        let tags = req.body.tags
        let temp
        console.log('masuk update')
        console.log(tags)
        let check = false
        User.findById(req.loggedUser.id)
        .then (result => {
            async function checkTags () {
                console.log(result, 'ini result')
                for (let i = 0; i < tags.length; i++) {
                    temp = tags[i].text
                    console.log(temp)
                    for (let j = 0; j < result.tags.length; j++) {
                        if (temp == result.tags[j]) {
                            check = true
                            console.log('check jadi true')
                        }
                    }
                    if (!check) {
                        console.log('masuk, create data')
                        await User.findByIdAndUpdate(req.loggedUser.id, {$push: {
                            tags: temp
                        }}, {new:true})
                    } else {
                        console.log('gak masuk create data')
                        check = false
                    }
                }
            }
            return checkTags()
        })
        .then (data => {
            res.status(200).json({message: 'berhasil menambahkan update'})
        })
        .catch (err => {
            next(err)
        })
    }

    static deleteTag (req, res, next) {
        let { tag } = req.body
        let arrTag = []
        User.findById(req.loggedUser.id)
        .then (result => {
            for (let i = 0; i < result.tags.length; i++ ) {
                if (result.tags[i] != tag) arrTag.push(result.tags[i])
            }
            return User.findByIdAndUpdate(req.loggedUser.id, { $set: {
                tags: arrTag
            }}, { new: true})
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findTag (req, res, next) {
        let { tag } = req.params
        Tag.find()
        .sort({ createdAt: 'desc' })
        .then (data => {
            if (data.length > 0) {
                let dataArr = []
                for (let el in data) {
                    if (data[el].tag.includes(tag)) {
                        dataArr.push(data[el])
                    }
                }
                res.status(200).json(dataArr)
            } else {
                let err = new Error ('Tag Masih Kosong')
                err.name = 'DataError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = TagController