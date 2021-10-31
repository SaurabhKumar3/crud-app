const userdb = require('../model/model');
var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: 'ca not found user with id :' })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error retrieving user with id" })
            })
    }
    else {
        userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error occured while retrieving data" })
            })


    }

}
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'data to update can not be empty' })
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "can not able to update.may be user not found" })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).semd({ message: 'error update user information' })
        })

}
exports.delete = (req, res) => {
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "id is wrong" })
            } else {
                res.send({
                    message: 'user is deleted successfully'
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'could not delete user with id you provided' })
        })

}