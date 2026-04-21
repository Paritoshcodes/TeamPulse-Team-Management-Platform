const express = require('express');
const upload = require('../middleware/upload');
const {
  createMember,
  getMembers,
  getMemberById,
  getMemberStats,
} = require('../controllers/memberController');

const router = express.Router();

router.get('/stats', getMemberStats);
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/', upload.single('profileImage'), createMember);

module.exports = router;
