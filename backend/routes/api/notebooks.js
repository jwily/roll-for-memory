const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { Notebook } = require('../../db/models');

const router = express.Router();

router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const book = await Notebook.findByPk(parseInt(req.params.id, 10));
        return res.json(book);
    })
);

router.get(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const books = await Notebook.findAll({ where: { userId: req.user.id } });
        return res.json(books);
    })
);

module.exports = router;