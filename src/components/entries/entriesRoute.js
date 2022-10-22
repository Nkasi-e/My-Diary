const { Router } = require('express');

const {
  viewAllEntries,
  postEntry,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
} = require('./entriesController');

const router = Router();

router.route('/').get(viewAllEntries).post(postEntry);
router
  .route('/:id')
  .get(viewSingleEntry)
  .delete(deleteEntry)
  .patch(modifyEntry);

module.exports = router;
