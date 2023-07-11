const express = require('express');
const { findById, findAll, create, update, destroy } = require('../database/data.manager.js');

const router = express.Router();

router.get('/', (req, res) => {
    findAll()
        .then((products) => res.status(200).send(products))
        .catch((error) => res.status(200).send(error.message));
});

router.get('/search/:id', (req, res) => {
    const { id } = req.params;

    findById(id)
        .then((product) => res.status(200).send(product))
        .catch((error) => res.status(500).send(error.message));
});

router.post('/add', (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    create(newProduct)
        .then((product) => res.status(200).send(product))
        .catch((error) => res.status(500).send(error.message));
});

router.put('/update', (req, res) => {
    const updateProduct = req.body;

    update(updateProduct)
        .then((product) => res.status(200).send(product))
        .catch((error) => res.status(500).send(error.message));
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    destroy(id)
        .then((products) => res.status(200).send(products))
        .catch((error) => res.status(500).send(error.message));
});

module.exports = router;