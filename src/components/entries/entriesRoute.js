const { Router } = require('express');
const { validateEntry } = require('../middleware/validation');
const validatorMiddleware = require('../middleware/validatorMiddleware');

const {
  viewAllEntries,
  postEntry,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
} = require('./entriesController');

const router = Router();

router
  .route('/')
  .get(viewAllEntries)
  .post([validatorMiddleware(validateEntry)], postEntry);
router
  .route('/:id')
  .get(viewSingleEntry)
  .delete(deleteEntry)
  .patch([validatorMiddleware(validateEntry)], modifyEntry);

module.exports = router;
