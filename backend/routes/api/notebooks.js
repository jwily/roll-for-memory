const express = require('express')
const asyncHandler = require('express-async-handler');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { Notebook } = require('../../db/models');

const router = express.Router();

const validateNotebook = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Your new notebook needs a name')
        .isLength({ max: 255 })
        .withMessage('Notebook names must be less than 255 characters')
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
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const bookId = req.params.id;
        const book = await Notebook.findByPk(bookId);
        await book.destroy();
        res.json({ message: 'Notebook successfully deleted.' })
    })
)

router.put(
    '/:id(\\d+)',
    requireAuth,
    validateNotebook,
    asyncHandler(async (req, res) => {
        const { bookId, name } = req.body;

        const valErrors = validationResult(req);

        const dupCheck = await Notebook.findOne({
            where: {
                userId: req.user.id,
                name
            }
        });

        if (dupCheck) {
            valErrors.errors.push({ msg: 'Another notebook already has that name' })
        }

        if (valErrors.isEmpty()) {
            const book = await Notebook.findByPk(bookId);
            await book.update({ name });
            return res.json(book);
        } else {
            const errors = valErrors.array().map(error => error.msg);
            return res.json({ errors })
        }
    })
)

router.post(
    '/',
    requireAuth,
    validateNotebook,
    asyncHandler(async (req, res) => {
        const { name } = req.body;

        const valErrors = validationResult(req);

        const dupCheck = await Notebook.findOne({
            where: {
                userId: req.user.id,
                name
            }
        });

        if (dupCheck) {
            valErrors.errors.push({ msg: 'Another notebook already has that name' })
        }

        if (valErrors.isEmpty()) {
            const book = await Notebook.create({
                userId: req.user.id,
                name
            })
            return res.json(book);
        } else {
            const errors = valErrors.array().map(error => error.msg);
            return res.json({ errors })
        }
    })
)

module.exports = router;
