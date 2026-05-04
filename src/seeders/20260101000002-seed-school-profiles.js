'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('school_profiles', [
      {
        school_name: 'SMK IT Asy-Syadzili',
        npsn: '69948648',
        address: 'Jl. Raya Asy-Syadzili No.1',
        phone: '(021) 1234567',
        email: 'info@smkasysyadzili.sch.id',
        website: 'https://smkasysyadzili.sch.id',
        logo_path: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('school_profiles', null, {});
  },
};
