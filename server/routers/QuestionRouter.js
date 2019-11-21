const routes = require("express").Router()
const QuestionController = require("../controllers/QuestionController")
const { authorization } = require("../middlewares/authorization")
const { authentication } = require("../middlewares/authentication")

routes.get("/", QuestionController.findAllQuestion)
routes.post("/", authentication, QuestionController.create)
routes.get("/myQuestion", authentication, QuestionController.findAll)
routes.get("/:id", QuestionController.findOne)
routes.patch("/upvote", authentication, QuestionController.upVotes)
routes.patch("/downvote", authentication, QuestionController.downVotes)
routes.patch("/:id", authentication, authorization, QuestionController.updateQuestion)
routes.delete("/:id", authentication, authorization, QuestionController.deleteQuestion)
routes.get("/tag/:tag", QuestionController.filterWatch)
routes.get("/title/:title", QuestionController.filterTitle)

module.exports = routes