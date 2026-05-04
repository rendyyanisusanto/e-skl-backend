'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('majors', [
      { code: 'TKJ', name: 'Teknik Komputer dan Jaringan', is_active: true, created_at: new Date(), updated_at: new Date() },
      { code: 'RPL', name: 'Rekayasa Perangkat Lunak', is_active: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('majors', { code: ['TKJ', 'RPL'] });
  },
};
