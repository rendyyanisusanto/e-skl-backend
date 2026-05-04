require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.APP_PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 E-SKL Server running on port ${PORT}`);
      console.log(`   ENV: ${process.env.APP_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
}

start();
