const db = require("../models");
const Book =  db.books;
const Op =  db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return ;
    } 

    const book = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    };

    Book.create(book)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:err.message
            })
        })
}

exports.findAll = (req, res) => {
    const title = req.body.title;
    let condition = title ? { title: {[Op.like]: `%${title}%`}} : null;

    Book.findAll({ where: condition})
        .then((data)=>{
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:err.message
            })
        })
}

exports.findOne =  (req, res) =>{
    const id = req.params.id;

    Book.findByPk(id)
        .then((data)=>{
            res.send(data);
        }).catch((err)=> {
            res.status(500).send({
                message:err.message
            })
        });
}


exports.update = (req, res) => {
    const id = req.params.id;

    Book.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if ( result == 1 ) {
            res.send({
                message: "Book was updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Book with id=${id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating post with id=" + id
        })
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Book was deleted successfully"
            })
        } else {
            res.send({
                message: `Cannot delete Book with id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete post with id=" + id
        })
    });
};


exports.deleteAll = (req, res) => {
    Book.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: `${result} Boos were deleted successfully!`
        });
    }).catch((err) => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while removing all posts."
        });
    });

};