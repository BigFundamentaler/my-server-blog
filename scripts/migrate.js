const { execSync } = require('child_process');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Database migration completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}