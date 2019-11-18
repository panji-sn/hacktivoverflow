const routes = require("express").Router()
const UserRouter = require("./UserRouter")
const AnswerRouter = require("./AnswerRouter")
const QuestionRouter = require("./QuestionRouter")
const TagRouter = require("./TagRouter")

routes.use("/", UserRouter)
routes.use("/question", QuestionRouter)
routes.use("/answer", AnswerRouter)
routes.use("/tag", TagRouter)

module.exports = routes