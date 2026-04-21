const Member = require('../models/Member');

function toPublicMember(req, member) {
  const payload = member.toObject();
  return {
    ...payload,
    profileImageUrl: `${req.protocol}://${req.get('host')}/uploads/${payload.profileImage}`,
  };
}

async function createMember(req, res, next) {
  try {
    const { name, role, email, contactNumber, year, department, bio, skills } = req.body;

    if (!name || !role || !email || !contactNumber) {
      return res.status(400).json({
        message: 'Name, role, email and contact number are required.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Profile image is required.',
      });
    }

    const member = await Member.create({
      name,
      role,
      email,
      contactNumber,
      year,
      department,
      bio,
      skills,
      profileImage: req.file.filename,
    });

    return res.status(201).json({
      message: 'Member added successfully.',
      member: toPublicMember(req, member),
    });
  } catch (error) {
    return next(error);
  }
}

async function getMembers(req, res, next) {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.json({
      count: members.length,
      members: members.map((member) => toPublicMember(req, member)),
    });
  } catch (error) {
    next(error);
  }
}

async function getMemberById(req, res, next) {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found.' });
    }

    return res.json({ member: toPublicMember(req, member) });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid member id.' });
    }
    return next(error);
  }
}

async function getMemberStats(req, res, next) {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    const uniqueRoles = new Set(
      members
        .map((member) => member.role.trim().toLowerCase())
        .filter(Boolean)
    );

    const latestMember = members.length ? members[0] : null;

    res.json({
      totalMembers: members.length,
      uniqueRoles: uniqueRoles.size,
      latestAddition: latestMember ? toPublicMember(req, latestMember) : null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  getMemberStats,
};
