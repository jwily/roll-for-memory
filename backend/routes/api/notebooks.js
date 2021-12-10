const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { Notebook } = require('../../db/models');

const router = express.Router();

const validateNotebook = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Your new notebook needs a name.'),
    handleValidationErrors
]

router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const book = await Notebook.findByPk(req.params.id);
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

router.delete(
    '/:id{\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const bookId = req.params.id;
        const book = await Notebook.findByPk(bookId);
        await book.destroy();
        res.json({ message: 'Notebook successfully deleted.' })
    })
)

module.exports = router;
