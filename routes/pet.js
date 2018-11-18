let Pet = require("../model/pet");

/*
 * GET /pets route to retrieve all the pets.
 */
let getPets = (req, res) => {
    Pet.find((err, pets) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(pets);
    });
};

/*
 * POST /pets to save a new pet.
 */
let postPet = (req, res) => {
    let pet = req.body;
    Pet.save(pet, (err, newPet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Pet successfully added!",
            pet: newPet
        });
    });
};

/*
 * GET /pets/:id route to retrieve the pet with given id
 */
let getPet = (req, res) => {
    Pet.findById(req.params.id, (err, pet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            pet
        });
    })
};

/*
 * DELETE /pets/:id to delete the pet with given id
 */
let deletePet = (req, res) => {
    Pet.delete(req.params.id, (err, result) => {
        res.json({
            message: "Pet successfully deleted!",
            result
        });
    })
};

/*
 * PUT /pets/:id to update the pet with given id
 */
let updatePet = (req, res) => {
    Pet.update(req.params.id, req.body, (err, pet) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Pet updated!",
            pet
        });
    })
};

//export all the functions
module.exports = {
    getPets,
    postPet,
    getPet,
    deletePet,
    updatePet
};
