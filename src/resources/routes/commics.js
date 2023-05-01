require("dotenv").config()
const express = require("express");
const userAuth = require("../middlewares/userAuth");
const checkauth = require("../middlewares/checkauth");
const comicServices = require("../services/comics")
const router = express.Router();

const comics = require("../services/comics")
const user = require("../services/user")

const commicsRoutes = (app) => {
  // routes for render views
    router.get("/:id",checkauth, comicServices.showcomic)
    router.get("/chapter/:id&:comic",checkauth,user.getexp, comics.chapter)
    router.get("/chapterapi/:chap",checkauth,user.getexp, comics.chapterapi)
    router.get("/category/:id&:numpage", comicServices.seachcategory)
    router.post("/followcomic",userAuth,comics.followcomic)
    router.post("/unfollowcomic",userAuth,comics.unfollowcomic)
    router.post("/comment",userAuth,comics.comment)

    return app.use("/comic", router)
}
module.exports = commicsRoutes