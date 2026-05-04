const { SchoolProfile } = require('../models');

const get = async () => {
  let profile = await SchoolProfile.findOne();
  if (!profile) {
    profile = await SchoolProfile.create({ schoolName: 'E-SKL School' });
  }
  return profile;
};

const update = async (data) => {
  let profile = await SchoolProfile.findOne();
  const mapped = {};
  if (data.school_name !== undefined) mapped.schoolName = data.school_name;
  if (data.npsn !== undefined) mapped.npsn = data.npsn;
  if (data.address !== undefined) mapped.address = data.address;
  if (data.phone !== undefined) mapped.phone = data.phone;
  if (data.email !== undefined) mapped.email = data.email;
  if (data.website !== undefined) mapped.website = data.website;
  if (data.logo_path !== undefined) mapped.logoPath = data.logo_path;

  if (!profile) {
    profile = await SchoolProfile.create({ schoolName: data.school_name || 'E-SKL School', ...mapped });
  } else {
    await profile.update(mapped);
  }
  return profile;
};

module.exports = { get, update };
