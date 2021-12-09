const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { Note } = require('../../db/models');

const router = express.Router();

router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const note = await Note.findByPk(parseInt(req.params.id, 10));
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
    asyncHandler(async (req, res) => {
        const {
            noteId, content, name
        } = req.body;

        const note = await Note.findByPk(noteId);
        await note.update({ content, name });
        return res.json(note);
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
        const noteId = parseInt(req.params.id, 10);
        const note = await Note.findByPk(noteId);
        await Note.destroy(note);
        res.json({ message: 'Note successfully deleted.' })
    })
)

module.exports = router;
