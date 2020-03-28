module.exports = app => {
    const books = require("../controllers/book.controllers");

    let router = require("express").Router();

    // Create a new post
    router.post("/", books.create);

    router.get("/", books.findAll);

    router.get("/:id", books.findOne);

    router.put("/:id", books.update);

    router.delete("/:id", books.delete);

    router.delete("/", books.deleteAll);

    app.use("/api/v1/books", router);
}