'use strict';
module.exports = {
  async up(queryInterface) {
    const [users] = await queryInterface.sequelize.query("SELECT id FROM users WHERE username='superadmin' LIMIT 1");
    const createdBy = users[0] ? users[0].id : null;
    await queryInterface.bulkInsert('graduation_periods', [
      {
        academic_year: '2025/2026',
        name: 'Kelulusan Kelas XII 2026',
        announcement_date: null,
        download_start_at: null,
        download_end_at: null,
        is_published: false,
        is_active: true,
        created_by: createdBy,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('graduation_periods', { academic_year: '2025/2026' });
  },
};
