const express = require('express')
const asyncHandler = require('express-async-handler');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { Note } = require('../../db/models');

const router = express.Router();

const validateNote = [
    check('name')
        .isLength({ max: 255 })
        .withMessage('Notebook names must be less than 255 characters')
]

router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const note = await Note.findByPk(req.params.id);
        return res.json(note);
    })
);

router.get(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const notes = await Note.findAll({ where: { userId: req.user.id } });
        return res.json(notes);
    })
);

router.put(
    '/:id(\\d+)',
    requireAuth,
    validateNote,
    asyncHandler(async (req, res) => {
        const {
            noteId, content, name
        } = req.body;

        const valErrors = validationResult(req);

        if (valErrors.isEmpty()) {
            const note = await Note.findByPk(noteId);
            await note.update({ content, name });
            return res.json(note);
        } else {
            const errors = valErrors.array().map(error => error.msg);
            return res.json({ errors })
        }
    })
);

router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const {
            bookId
        } = req.body;

        const note = await Note.create({
            userId: req.user.id,
            notebookId: bookId,
            content: '',
            name: ''
        })

        return res.json(note);
    })
);

router.delete(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const noteId = req.params.id;
        const note = await Note.findByPk(noteId);
        await note.destroy();
        res.json({ message: 'Note successfully deleted.' })
    })
)

module.exports = router;
