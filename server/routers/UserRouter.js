const UserController = require("../controllers/UserController")
const TagController = require('../controllers/TagController')
const routes = require("express").Router()
const { authentication } = require("../middlewares/authentication")

routes.post("/register", UserController.create)
routes.post("/login", UserController.login)
routes.get("/user", authentication, UserController.findOne)
routes.get("/tags", authentication, TagController.findAll)

module.exports = routes