const TagController = require('../controllers/TagController')
const routes = require("express").Router()
const { authentication } = require("../middlewares/authentication")

routes.get("/", authentication, TagController.findAll)
routes.post("/", authentication, TagController.updateTag)
routes.get("/:tag", authentication, TagController.findTag)

module.exports = routes