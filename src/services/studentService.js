const { Student, GraduationResult, StudentRequirement, RequirementType, SklDocument, Class, Major, GraduationPeriod } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');

const generateAccessToken = () => crypto.randomBytes(32).toString('hex');

const getAll = async ({ graduation_period_id, class_id, major_id, status, search, page = 1, limit = 20 }) => {
  const where = { isActive: true };
  if (graduation_period_id) where.graduationPeriodId = graduation_period_id;
  if (class_id) where.classId = class_id;
  if (major_id) where.majorId = major_id;
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { nis: { [Op.like]: `%${search}%` } },
      { nisn: { [Op.like]: `%${search}%` } },
    ];
  }

  const include = [
    { model: Class, as: 'class', attributes: ['id', 'name'] },
    { model: Major, as: 'major', attributes: ['id', 'code', 'name'] },
    { model: GraduationResult, as: 'graduationResult', attributes: ['status'], ...(status ? { where: { status } } : {}) },
    { model: SklDocument, as: 'sklDocument', attributes: ['id', 'status', 'verificationCode'] },
  ];

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const { count, rows } = await Student.findAndCountAll({
    where,
    include,
    limit: parseInt(limit),
    offset,
    order: [['name', 'ASC']],
    distinct: true,
  });
  return { total: count, page: parseInt(page), limit: parseInt(limit), data: rows };
};

const getById = async (id) => {
  const s = await Student.findByPk(id, {
    include: [
      { model: Class, as: 'class' },
      { model: Major, as: 'major' },
      { model: GraduationPeriod, as: 'graduationPeriod' },
      { model: GraduationResult, as: 'graduationResult' },
      { model: StudentRequirement, as: 'requirements', include: [{ model: RequirementType, as: 'requirementType' }] },
      { model: SklDocument, as: 'sklDocument' },
    ],
  });
  if (!s) throw { status: 404, message: 'Siswa tidak ditemukan.' };
  return s;
};

const create = async (data) => {
  const accessToken = generateAccessToken();
  const student = await Student.create({
    graduationPeriodId: data.graduation_period_id,
    classId: data.class_id || null,
    majorId: data.major_id || null,
    nis: data.nis || null,
    nisn: data.nisn,
    name: data.name,
    gender: data.gender || null,
    birthPlace: data.birth_place || null,
    birthDate: data.birth_date || null,
    parentName: data.parent_name || null,
    address: data.address || null,
    phone: data.phone || null,
    accessToken,
    isActive: true,
  });

  // Auto create graduation result
  await GraduationResult.create({
    studentId: student.id,
    graduationPeriodId: student.graduationPeriodId,
    status: 'DITUNDA',
  });

  // Auto generate requirements
  const reqTypes = await RequirementType.findAll({
    where: { graduationPeriodId: student.graduationPeriodId, isActive: true },
  });
  if (reqTypes.length > 0) {
    await StudentRequirement.bulkCreate(
      reqTypes.map(rt => ({ studentId: student.id, requirementTypeId: rt.id, status: 'PENDING' })),
      { ignoreDuplicates: true }
    );
  }

  return student;
};

const update = async (id, data) => {
  const s = await Student.findByPk(id);
  if (!s) throw { status: 404, message: 'Siswa tidak ditemukan.' };
  const updateData = {};
  if (data.graduation_period_id !== undefined) updateData.graduationPeriodId = data.graduation_period_id;
  if (data.class_id !== undefined) updateData.classId = data.class_id || null;
  if (data.major_id !== undefined) updateData.majorId = data.major_id || null;
  if (data.nis !== undefined) updateData.nis = data.nis;
  if (data.nisn !== undefined) updateData.nisn = data.nisn;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender || null;
  if (data.birth_place !== undefined) updateData.birthPlace = data.birth_place;
  if (data.birth_date !== undefined) updateData.birthDate = data.birth_date;
  if (data.parent_name !== undefined) updateData.parentName = data.parent_name;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.phone !== undefined) updateData.phone = data.phone;
  await s.update(updateData);
  return s;
};

const deactivate = async (id) => {
  const s = await Student.findByPk(id);
  if (!s) throw { status: 404, message: 'Siswa tidak ditemukan.' };
  await s.update({ isActive: false });
  return s;
};

module.exports = { getAll, getById, create, update, deactivate, generateAccessToken };
