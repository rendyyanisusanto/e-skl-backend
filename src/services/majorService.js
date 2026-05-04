const { Major } = require('../models');

const getAll = async () => Major.findAll({ order: [['code', 'ASC']] });

const getById = async (id) => {
  const m = await Major.findByPk(id);
  if (!m) throw { status: 404, message: 'Jurusan tidak ditemukan.' };
  return m;
};

const create = async (data) => {
  return Major.create({
    code: data.code,
    name: data.name,
    isActive: data.is_active !== undefined ? data.is_active : true,
  });
};

const update = async (id, data) => {
  const m = await getById(id);
  const updateData = {};
  if (data.code !== undefined) updateData.code = data.code;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.is_active !== undefined) updateData.isActive = data.is_active;
  await m.update(updateData);
  return m;
};

const deactivate = async (id) => {
  const m = await getById(id);
  await m.update({ isActive: false });
  return m;
};

module.exports = { getAll, getById, create, update, deactivate };
