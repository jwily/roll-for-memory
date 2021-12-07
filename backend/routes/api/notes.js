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
        const note = await Note.findByPk(parseInt(req.params.id, 10))
        return res.json(note);
    }));

module.exports = router;
